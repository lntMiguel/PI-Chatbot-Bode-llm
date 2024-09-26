'use client';
import { useState, useEffect } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(''); // Estado para armazenar o chatId

  useEffect(() => {
    // Tentar carregar o chatId do localStorage ao montar o componente
    let storedChatId = localStorage.getItem('chatId');
    if (!storedChatId) {
      storedChatId = generateChatId();
      localStorage.setItem('chatId', storedChatId);
    }
    setChatId(storedChatId);
  }, []); // O array vazio faz com que este efeito execute apenas uma vez quando o componente é montado

  const sendMessage = async () => {
    if (!input.trim()) return; // Não enviar mensagens vazias

    const userMessage = { from: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Adiciona a mensagem do usuário

    try {
      const response = await fetch(`http://localhost:8080/api/assistant/chat?chatId=${chatId}&message=${encodeURIComponent(input)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem: ' + response.status);
      }

      // Recebe a resposta como texto simples
      const data = await response.text(); // Altera para .text() já que é uma string
      console.log('Resposta do chatbot:', data); // Debug da resposta

      // Certifique-se de que a resposta é uma string
      const botMessage = { from: "bot", text: data }; // Usa a resposta como texto
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Adiciona a mensagem do bot
      setInput(''); // Limpa o campo de entrada
    } catch (error) {
      console.error(error);
    }
  };

  const generateChatId = () => {
    // Lógica para gerar um chatId, por exemplo, um UUID
    return 'chat-' + Math.random().toString(36).substring(2, 15); // Gerando um ID aleatório
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.from}>
            {msg.from === "user" ? "Você" : "Bot"}: {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)} // Atualiza o input
        placeholder="Digite sua mensagem..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
