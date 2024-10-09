import styled from "styled-components";

const StyledHeader = styled.div`
    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
    

  & img.fundo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    z-index: -1;
    filter: blur(4px);
    
  }

  & img.icon {
     padding: 10px 14px;
  }

  & a {
    color: white;
    font-size: 20px;
    padding: 10px 14px;
    margin-right: 14px;
    font-family: "Montserrat";
    font-weight: bold;
    text-decoration: none;
    transition: box-shadow;
    position: relative;
    z-index: 1;
    background-color: #004aad;
    border-radius:10px;
    bottom: 10px
  }

  & a:hover {
    color: #ffb46e;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: background-box-shadow;
  }
   
  & img.logo {
   margin-right: 14px;
  }


`
/* &button {
    background-color: #2967F4;
    color: white;
    font-family: "Montserrat";
    font-weight: bold;
    cursor: pointer;
    padding: 10px 14px;
    margin-left: 10px;
    font-size: 15px;
    border-color: #004A8C;
    border-width: 0.0625rem;
    border-radius:10px;
    display: inline-block;
    text-align: center;
    position: relative;
    left: 430px;
    z-index: 1;
  }*/

function Header(){
    return(
        <StyledHeader>
          <div>
            <img className="logo" src="https://www.sp.senac.br/o/senac-theme/images/logo_senac_default.png"  height="50px" />
            <a href="https://www.sp.senac.br">Senac SP</a>
            <a href="https://www.sp.senac.br">Suporte</a>
          </div>
            <img className="fundo" src="imagem/fundo2.png" height="auto" width="100%"/>
        </StyledHeader>
    )
}

export default Header;