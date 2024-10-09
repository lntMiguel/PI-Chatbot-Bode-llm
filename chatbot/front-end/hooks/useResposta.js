'use client'

import { useState } from "react";
import { resposta } from "@/services/respostaService";

    export function useResposta(){
        const [mensagemUsuario, setMensagemUsuario] = useState('');
        const[erro, setErro] = useState(null);

        const handleSubmit = async (e) => {
            e.preventDefault();
        try{
            await resposta({mensagemUsuario})
            console.log(resposta({mensagemUsuario}))
        }catch(error){
            setErro(erro)
        }
        }
        
        return{
            mensagemUsuario,
            setMensagemUsuario,
            erro,
            setErro,
            handleSubmit
            
        }
        
    }