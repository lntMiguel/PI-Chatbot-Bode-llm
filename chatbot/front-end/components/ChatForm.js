export default function Form({mensagemUsuario,setMensagemUsuario,erro, handleSubmit}){
    return(
        <form onSubmit={handleSubmit}>
            <input
            type="mensagemUsuario"
            placeholder="Digite sua mensagem"
            value={mensagemUsuario}
            onChange={(e) => setMensagemUsuario(e.target.value)}
            />
            {erro && <p>{erro}</p>}
            <button type="submit">Cadastrar-se</button>
        </form>
    )
}