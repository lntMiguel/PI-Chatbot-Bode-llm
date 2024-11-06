'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}