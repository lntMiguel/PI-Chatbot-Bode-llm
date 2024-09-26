
export var ConteudoMensagem = {
  "mandante": 'usuario' | 'assistente',
  "conteudo": ""
}

export var Balao =  {
  mensagem: ConteudoMensagem
}

export default function Mensagem({mandante, conteudo}) {
  return (
    <div className="mensagem">
      <div>{mandante === 'usuario' ? '🧑‍💻 Você' : '🤖 Assistente'}</div>
      <div>
        <p>
          {conteudo}
        </p>
      </div>
    </div>
  )
};
