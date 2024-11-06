package br.com.miguel.kaipiva.langchain;

import java.time.Duration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import dev.langchain4j.memory.chat.ChatMemoryProvider;
import dev.langchain4j.memory.chat.TokenWindowChatMemory;
import dev.langchain4j.model.Tokenizer;
import dev.langchain4j.model.ollama.OllamaChatModel;
import dev.langchain4j.model.ollama.OllamaStreamingChatModel;

@Configuration
public class LangChainConfig {
    
    // Define o modelo de chat principal da IA.
    @Bean
    public OllamaChatModel chatLanguageModel() {
        return OllamaChatModel.builder()
                .baseUrl("url") // URL da API onde o modelo está hospedado.
                .modelName("LNT/kaipiva") // Nome do modelo que será utilizado.
                .temperature(0.8) // Controla a "criatividade" das respostas; quanto maior, mais variada a resposta.
                .timeout(Duration.ofSeconds(60)) // Define um tempo limite para as respostas da IA.
                .build();
    }

    // Define o modelo de chat em fluxo contínuo para respostas transmitidas em partes.
    @Bean
    public OllamaStreamingChatModel streamingChatModel() {
        return OllamaStreamingChatModel.builder()
                .baseUrl("url") // URL da API para o modelo em modo de fluxo.
                .modelName("LNT/kaipiva") // Nome do modelo para o modo de streaming.
                .temperature(0.8) // Define a variabilidade nas respostas.
                .timeout(Duration.ofSeconds(60)) // Define o tempo limite para respostas no modo de fluxo.
                .build();
    }

    // Provedor de memória de chat para reter contexto entre as mensagens.
    @Bean
    ChatMemoryProvider chatMemoryProvider(Tokenizer tokenizer) {
        // Define um limite máximo de 1000 tokens para manter o histórico do chat.
        return chatId -> TokenWindowChatMemory.withMaxTokens(1000, tokenizer);
    }
}
