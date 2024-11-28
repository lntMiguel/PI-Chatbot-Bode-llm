'use client'; // Essa diretiva é usada em Next.js para indicar que esse código é executado no lado do cliente
import { useState, useEffect, useRef } from "react";

const styles = {
  img: {
  position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '70vh', 
    zIndex: '-1', 
    filter: 'blur(8px)', 
  },
  chatContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: '70px',
    backgroundColor: 'rgba(219, 219, 219, 0.8)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    position: 'relative' ,
  },
  title: {
    fontSize: '3rem',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  messages: {
    flexGrow: '1',
    overflowY: 'auto',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column', 
    },
  userMessage: {
    backgroundColor: '#343a40',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '8px',
    flexDirection: 'row-reverse', 
    maxWidth: '97%',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap', 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  botMessage: {
    backgroundColor: '#004aad',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '8px',
    flexDirection: 'row',  
    maxWidth: '97%',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
    
  },
  avatarContainer: {
    marginRight: '10px',  
    marginLeft: '10px', 
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  text: {
    color: 'white',
    fontSize: '1.2rem',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    maxWidth: '90%',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  input: {
    flexGrow: '1',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    outline: 'none'
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  sendButton: {
    padding: '10px 15px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  sendButtonHover: {
    backgroundColor: '#0056b3',
  },
  sendButtonActive: {
    backgroundColor: '#003f7f',
  },
  typingIndicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15px',
    position: 'relative',
  },
  typingBalloon: {
    position: 'absolute',
    bottom: '20px',
    padding: '8px 20px',
    backgroundColor: 'black',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'typingBalloonAnimation 1.5s infinite',
  },
  typingDot: {
    width: '10px',
    height: '10px',
    backgroundColor: 'white',
    borderRadius: '50%',
    margin: '0 5px',
    animation: 'typing 1.5s infinite ease-in-out', // Aplicando animação de movimento para cada bolinha
  },
  typingDot1: {
    animationDelay: '0s',
  },
  typingDot2: {
    animationDelay: '0.3s',
  },
  typingDot3: {
    animationDelay: '0.6s',
  },
};

const globalStyles = `
  @keyframes typing {
    0% {
      transform: translateY(0);
      opacity: 0.5;
    }
    50% {
      transform: translateY(-10px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 0.5;
    }
  }

  @keyframes typingBalloonAnimation {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    50% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;

export default function Chatbot() {
  // Estado para armazenar as mensagens do chat
  const [messages, setMessages] = useState([]);

  // Estado para armazenar o input atual do usuário
  const [input, setInput] = useState("");

  // Estado para armazenar o chatId, utilizado para identificar sessões de chat
  const [chatId, setChatId] = useState('');

  const [isThinking, setIsThinking] = useState(false);
  
  const messagesEndRef = useRef(null);
  
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
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const sendMessage = async () => {
    if (!input.trim()) return; // Verifica se a mensagem é vazia ou contém apenas espaços; se sim, não envia

    // Cria um objeto de mensagem do usuário e adiciona à lista de mensagens
    const userMessage = { from: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsThinking(true);

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
      setIsThinking(false);
      setInput(''); // Limpa o campo de entrada após enviar a mensagem
    } catch (error) {
      console.error(error); // Caso ocorra algum erro, exibe no console
      setIsThinking(false);
    }
  };

  // Função para gerar um chatId aleatório
  const generateChatId = () => {
    // Gera um chatId aleatório baseado em caracteres alfanuméricos
    return 'chat-' + Math.random().toString(36).substring(2, 15);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Evita que o formulário seja enviado
      sendMessage(); // Chama a função de enviar a mensagem ao pressionar Enter
    }
  };

  return (    
  <div>
    <style>{globalStyles}</style>
  <img className="fundo" src="imagem/senacs.png"  style={styles.img}/>
     <div style={styles.chatContainer}>
      <div style={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.from === 'user' ? styles.userMessage : styles.botMessage}>
            <div style={styles.avatarContainer}>
              <img 
                src={msg.from === 'user' ? 'imagem/curint.jpg' : 'imagem/ma.png'} 
                alt={msg.from === 'user' ? 'Você' : 'Kaipiva'} 
                style={styles.avatar}
              />
            </div>
            <div style={styles.text}>
              <strong>{msg.from === 'user' ? 'Você' : 'Kaipiva'}:</strong> {msg.text}
            </div>
            <div ref={messagesEndRef}></div>
          </div>
          
        ))}
      </div>
      {isThinking && (
        <div style={styles.typingIndicator}>
              <div style={styles.typingBalloon}>
                <div style={{ ...styles.typingDot, ...styles.typingDot1 }}></div>
                <div style={{ ...styles.typingDot, ...styles.typingDot2 }}></div>
                <div style={{ ...styles.typingDot, ...styles.typingDot3 }}></div>
              </div>
            </div>
          )}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Digite sua mensagem..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendButton}>💬</button>
        </div>
    </div>
    </div>
  );
}
