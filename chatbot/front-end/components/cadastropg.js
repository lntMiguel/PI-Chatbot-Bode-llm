import styled from "styled-components";

const StyledCadastro = styled.div`
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
  height: 25em;
  top: 140px;
  }

  & .mas{
  position: relative;
  left: 123px;
  bottom: 80px;
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
function Cadastro() {
    return (
        <StyledCadastro> 
            <Box className="box" >
                <img className="mas" src="imagem/mascote.png" />
                  
            </Box>
        </StyledCadastro>
    )
}

export default Cadastro;