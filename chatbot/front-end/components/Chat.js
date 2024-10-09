import styled from "styled-components";
import Link from "next/link";

const StyledChat = styled.div`

    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    

button {
  position: relative;
  border: 2px solid #004aad;
  background-color: #004aad;
  color: white;
  border-radius: 0.9em;
  cursor: pointer;
  padding: 0.8em 1.2em 0.8em 1em;
  transition: all ease-in-out 0.2s;
  font-size: 25px;
  right: 70px;
  bottom: 500px;
}

button span {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 600;
}

button:hover {
  background-color: #0071e2;
  color: #ffb46e;
}

a {
    text-decoration: none;
    color: inherit;
  }

`
function chat(){
    return(
    <StyledChat>
    <button>
         <Link href="/login">Conversar</Link>  
    </button>      
    </StyledChat>
    )
}

export default chat;