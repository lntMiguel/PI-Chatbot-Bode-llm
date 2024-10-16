import styled from "styled-components";
import { useRouter } from 'next/navigation';

const Styledbody = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  

  .box {
    background-color: #004aad;
    
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    text-align: center;
    flex-direction: column;
    gap: 10px;
    top: 140px;
  }

  button {
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
  left: 150px;
}

  button span {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 600;
}

  button:hover {
  color: #ffb46e;
  background-color: #0071e2;
}

  & .mas{
  position: relative;
  left: 123px;
  width: 45%;
  }

`
const Box = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`
function LoginBody(){
  const router = useRouter();  

  const handleRedirect = () => {
    router.push('/chat');
  };

  return(
    <Styledbody>
      <Box className="box" >
      <img className="mas" src="imagem/mascote.png"/>  
      <button onClick={handleRedirect}>Login</button>
      <button>Cadastrar</button>
      
      </Box>
    </Styledbody>
  )
}

export default LoginBody;
