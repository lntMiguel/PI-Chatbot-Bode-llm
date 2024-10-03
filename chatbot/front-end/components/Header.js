import styled from "styled-components";

const StyledHeader = styled.div`
    display:flex;
    justify-content: center;
    align-itens:center;
    width: 100%;
    align-items: center;
    height: 120px;
    & img{
      padding-right:20px;

    }
    
    & a{
        color: #005A8C;
        font-size: 20px;
        padding: 14px;
        font-family: "Montserrat";
        font-weight: bold;
        text-decoration: none;
        transition: box-shadow;
        margin-left:10px;
    }
    & a:hover{
        color: #ffb46e;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transition: background-box-shadow;
    }

    & button{
        background-color: #2967F4;
        color: white;
        font-family: "Montserrat";
        font-weight: bold;
        cursor: pointer;
        padding: 7px 14px;
        font-size: 12px;
        border-color: #004A8C;
        border-width: 0.0625rem;
        display: inline-block;
        text-align: center;
        margin-left:20px;


    }
`

function Header(){
    return(
        <StyledHeader>
            
            <img src="https://www.sp.senac.br/o/senac-theme/images/logo_senac_default.png" alt="icon" height="50px" />
            <a href="https://www.sp.senac.br">Senac SP</a>
            <a href="https://www.sp.senac.br">Suporte</a>
            <button>Comece a usar!</button>
        </StyledHeader>

    )
}

export default Header;