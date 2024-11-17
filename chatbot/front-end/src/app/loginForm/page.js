'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Login from '@/components/loginpg';
import styled from 'styled-components';

const StyledDados = styled.div`

  display: flex;
  justify-content: center;
  align-items: center; 

 & input {
    color: #fff;
    font-size: 20px;
    background-color: #4f4f4f;
    border: none;
    border-radius: 4px;
    padding: 10px 10px 10px 15px;
    width: 300px;
    transition: all 0.2s ease;
  }

  & label {
    font-family: "Montserrat";
    font-weight: bold;
    font-size: 10px;
    color: white;
    position: absolute;
    left: 15px;
    bottom: 10px;
    transition: 0.2s ease-in-out;
    pointer-events: none;
    border-bottom: 1px solid #ffffff;
  }

 & input:focus + label,
  & input:not(:placeholder-shown) + label {
    bottom: 35px;
    font-size: 16px;
    color: #24b4fb;
  }

& .email {
  position: relative;
  bottom: 140px;
}

& .senha {
  position: relative;
  bottom: 120px;
}

& button {
  font-family: "Montserrat";
  font-weight: bold;
  border: 2px solid #24b4fb;
  background-color: #24b4fb;
  border-radius: 0.9em;
  cursor: pointer;
  padding: 0.8em 1.2em 0.8em 1em;
  transition: all ease-in-out 0.2s;
  font-size: 20px;
  width: 200px; 
  position: relative;
  left: 60px;
  bottom: 50px;
}

& button span {
  color: #fff;
  font-weight: 600;
}

& button:hover {
  color: #ffb46e;
  background-color: #0071e2;
}
`

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();  

  const handleRedirect = () => {
    router.push('/chat');
  };
 

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpa a mensagem de erro ao iniciar uma nova tentativa

    try {
        const response = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const responseText = await response.text(); 

        if (!response.ok) {
            throw new Error(responseText || 'Erro ao fazer login');
        }
        
        console.log('Login successful:', responseText);
        
        handleRedirect();
    } catch (error) {
        setErrorMessage(error.message);
    }
};

  return (
    <div>
      <Header/>
      <Login/>
      <StyledDados>
      <form onSubmit={handleLogin}>
        <div className='email'>
          <label></label>
          <input
            name="Email" autocomplete="off"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmail('')}  // Limpa o campo quando o usuário clica
            placeholder="Digite seu email" // Texto que aparece antes de digitar
            required
          />
        </div>
        <div className='senha'>
          <label></label>
          <input
            name="Senha" autocomplete="off"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPassword('')}  // Limpa o campo quando o usuário clica
            placeholder="Digite sua senha" // Texto que aparece antes de digitar
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      </StyledDados>
    </div>
  );
}