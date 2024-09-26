import React, { useRef, useEffect } from 'react';
import Mensagem, {ConteudoMensagem, Balao} from './Mensagem';

var MensagensDoChat = {
  "mensagens": ConteudoMensagem[{}],
  "className": ""
}

export default function Chat(MensagensDoChat) {
  const fimDaMensagem = useRef<HTMLDivElement>(null); //Hook -> O useRef atua como uma função que retorna um objeto ref 
                                                     //e recebe um argumento que inicializa a propriedade .current desse objeto.
                                                     //HTMLDivElement -> Fornece propriedades especiais (além da interface HTMLElement 
                                                     //normal, ela também está disponível por herança) para manipulação de elementos.

  // Scroll automatico
  useEffect(() => {
    if (fimDaMensagem.current) {
        fimDaMensagem.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [MensagensDoChat.mensagens]);

  return (
    <div className={MensagensDoChat.className}>
      {MensagensDoChat.mensagens.map((msg, index) => (
        <Mensagem key={index} mandante={Balao.mensagem.mandante} mensagem={msg} />
      ))}
      <div ref={fimDaMensagem} />
    </div>
  );
}