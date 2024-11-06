'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastroForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();  

  const handleRedirect = () => {
    router.push('/loginForm');
  };
 

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpa a mensagem de erro ao iniciar uma nova tentativa

    try {
        const response = await fetch('http://localhost:8080/users/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const responseText = await response.text(); 

        if (!response.ok) {
            throw new Error(responseText || 'Erro ao fazer cadastro');
        }
        
        console.log('Sucesso!:', responseText);
        
        handleRedirect();
    } catch (error) {
        setErrorMessage(error.message);
    }
};

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}