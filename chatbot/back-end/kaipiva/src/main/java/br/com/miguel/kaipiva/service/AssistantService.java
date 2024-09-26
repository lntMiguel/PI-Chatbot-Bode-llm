package br.com.miguel.kaipiva.service;

import org.springframework.stereotype.Service;

import br.com.miguel.kaipiva.langchain.LangChain4jAssistant;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;


@Service
public class AssistantService {
    private final LangChain4jAssistant langChain4JAssistant;

    public AssistantService(LangChain4jAssistant langChain4JAssistant) {
        this.langChain4JAssistant = langChain4JAssistant;
    }

    public Flux<String> chat(String chatId, String userMessage) {
        Sinks.Many<String> sink = Sinks.many().unicast().onBackpressureBuffer();

        // Inicia o fluxo de chat
        langChain4JAssistant.chat(chatId, userMessage)
            .onNext(response -> {
                // Aqui, assume-se que response é uma String
                System.out.println("Resposta do assistente: " + response);
                sink.tryEmitNext(response); // Emitindo a resposta
            })
            .onComplete((response) -> {
                // Não é necessário fazer nada especial, mas você pode logar se desejar
                System.out.println("Processo de chat concluído.");
                sink.tryEmitComplete(); // Emitindo a conclusão
            })
            .onError(error -> {
                System.err.println("Erro ao processar resposta do assistente: " + error.getMessage());
                sink.tryEmitError(error);
            })
            .start();

        // Retorna um Flux para o cliente consumir
        return sink.asFlux();
    }
}
