package br.com.miguel.kaipiva.service;

import org.springframework.stereotype.Service;
import br.com.miguel.kaipiva.langchain.LangChain4jAssistant;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Service
public class AssistantService {
    // Injeção da interface LangChain4jAssistant, que define o modelo de assistente de IA
    private final LangChain4jAssistant langChain4JAssistant;

    // Construtor que injeta a dependência LangChain4jAssistant
    public AssistantService(LangChain4jAssistant langChain4JAssistant) {
        this.langChain4JAssistant = langChain4JAssistant;
    }

    // Método que inicia o chat com a IA e retorna respostas em tempo real
    public Flux<String> chat(String chatId, String userMessage) {
        // Cria um Sink (buffer) de strings para emitir mensagens reativas durante o processamento
        Sinks.Many<String> sink = Sinks.many().unicast().onBackpressureBuffer();

        // Inicia uma chamada de chat para LangChain4jAssistant com ID do chat e mensagem do usuário
        langChain4JAssistant.chat(chatId, userMessage)
            .onNext(response -> {
                // Processa cada resposta do assistente e a envia para o Flux
                System.out.println("Resposta do assistente: " + response);
                sink.tryEmitNext(response); 
            })
            .onComplete((response) -> {
                // Indica que o processo de chat foi concluído
                System.out.println("Processo de chat concluído.");
                sink.tryEmitComplete(); 
            })
            .onError(error -> {
                // Lida com erros que possam ocorrer durante o processamento da resposta
                System.err.println("Erro ao processar resposta do assistente: " + error.getMessage());
                sink.tryEmitError(error);
            })
            .start();

        // Retorna o Flux criado para ser consumido pelo controller
        return sink.asFlux();
    }
}
