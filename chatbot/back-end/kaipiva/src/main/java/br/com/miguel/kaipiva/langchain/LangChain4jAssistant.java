package br.com.miguel.kaipiva.langchain;

import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.TokenStream;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.spring.AiService;

@AiService
public interface LangChain4jAssistant {
    @SystemMessage("""
            Você é um agente de suporte por chat ao cliente do Centro Universitário Senac.
            Responda de maneira amigável, prestativa e alegre.
            Você está interagindo com os clientes por meio de um sistema de chat online.
            """)
    TokenStream chat(@MemoryId String chatId, @UserMessage String userMessage);
}
