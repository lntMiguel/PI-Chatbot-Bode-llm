package br.com.miguel.kaipiva.langchain;

import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.TokenStream;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.spring.AiService;

@AiService
public interface LangChain4jAssistant {

    // Anotação para definir uma mensagem do sistema que será enviada ao modelo antes de todas as interações.
    @SystemMessage("""
            Você se chama Kap. Você é um agente de suporte do Centro Universitário Senac e está interagindo com clientes a partir de um ChatBot. Responda de maneira amigável, responda apenas perguntas sobre o Senac.
            """
    )
    
    // Método que define o chat da IA, usando memória e mensagens do usuário.
    TokenStream chat(@MemoryId String chatId, @UserMessage String userMessage);
}
