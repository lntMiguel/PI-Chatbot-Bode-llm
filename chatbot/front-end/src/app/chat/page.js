'use client'; // Essa diretiva é usada em Next.js para indicar que esse código é executado no lado do cliente
import { useState, useEffect } from "react";

export default function Chatbot() {
  // Estado para armazenar as mensagens do chat
  const [messages, setMessages] = useState([]);
  
  // Estado para armazenar o input atual do usuário
  const [input, setInput] = useState("");

  // Estado para armazenar o chatId, utilizado para identificar sessões de chat
  const [chatId, setChatId] = useState(''); 

  useEffect(() => {
    // Tentar carregar o chatId do localStorage ao montar o componente (ou seja, quando a página carrega)
    let storedChatId = localStorage.getItem('chatId');
    
    // Se não houver um chatId no localStorage, gera um novo e armazena
    if (!storedChatId) {
      storedChatId = generateChatId();
      localStorage.setItem('chatId', storedChatId);
    }
    setChatId(storedChatId); // Define o chatId carregado ou gerado
  }, []); // O array vazio faz com que este efeito execute apenas uma vez, durante a montagem do componente

  const sendMessage = async () => {
    if (!input.trim()) return; // Verifica se a mensagem é vazia ou contém apenas espaços; se sim, não envia

    // Cria um objeto de mensagem do usuário e adiciona à lista de mensagens
    const userMessage = { from: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Envia uma requisição POST para o back-end com o chatId e a mensagem do usuário
      const response = await fetch(`http://localhost:8080/api/assistant/chat?chatId=${chatId}&message=${encodeURIComponent(input)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Informa ao servidor que está enviando JSON
        },
      });

      // Verifica se a resposta foi bem-sucedida (código 200-299)
      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem: ' + response.status); // Lança um erro se a requisição falhar
      }

      // Recebe a resposta do chatbot como texto simples (plain text)
      const data = await response.text(); // Altera para .text() já que o backend retorna uma string

      console.log('Resposta do chatbot:', data); // Debug da resposta para verificar o que foi retornado pelo servidor

      // Cria um objeto de mensagem do bot e adiciona à lista de mensagens
      const botMessage = { from: "bot", text: data };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      setInput(''); // Limpa o campo de entrada após enviar a mensagem
    } catch (error) {
      console.error(error); // Caso ocorra algum erro, exibe no console
    }
  };

  // Função para gerar um chatId aleatório
  const generateChatId = () => {
    // Gera um chatId aleatório baseado em caracteres alfanuméricos
    return 'chat-' + Math.random().toString(36).substring(2, 15);
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <div>
        {messages.map((msg, index) => (
          // Exibe cada mensagem, diferenciando mensagens do usuário e do bot
          <div key={index} className={msg.from}>
            {msg.from === "user" ? "Você" : "Kaipiva"}: {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input} // Valor do input está ligado ao estado
        onChange={(e) => setInput(e.target.value)} // Atualiza o estado do input à medida que o usuário digita
        placeholder="Digite sua mensagem..."
      />
      <button onClick={sendMessage}>Enviar</button> {/* Botão para enviar a mensagem */}
    </div>
  );
}
