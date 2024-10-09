import styled from "styled-components";

const StyledBody = styled.div`
    
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    
    
    & .ia{
    position: relative;
    margin-left: 220px; 
    margin-bottom: 230px;

    }


`


function Body(){
    return(
        <StyledBody>
            <img className="ia" src="imagem/ap.png" width="40%"/>      
        </StyledBody>

    )
}

export default Body;