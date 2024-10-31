package br.com.miguel.kaipiva.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import br.com.miguel.kaipiva.service.AssistantService;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/assistant")
public class AssistantController {

    // Logger para registrar informações e erros no sistema de log
    private static final Logger logger = LoggerFactory.getLogger(AssistantController.class);
    
    // Declaração do serviço AssistantService, que contém a lógica de negócios
    private final AssistantService assistantService;

    // Injeção de dependência do serviço AssistantService no construtor
    public AssistantController(AssistantService assistantService) {
        this.assistantService = assistantService;
    }

    // Endpoint para processar mensagens enviadas pelo usuário
    @PostMapping(value = "/chat", produces = MediaType.TEXT_PLAIN_VALUE)
    public Flux<String> chat(@RequestParam String chatId, @RequestParam String message) {
        try {
            // Log de entrada da mensagem recebida com o identificador do chat
            logger.info("Recebida mensagem do chatId: {}", chatId);

            // Passa a mensagem para o serviço que processa o chat e retorna uma resposta como Flux<String>
            return assistantService.chat(chatId, message);
        } catch (Exception e) {
            // Log de erro caso ocorra alguma exceção durante o processamento
            logger.error("Erro ao processar a mensagem do chatId: {}", chatId, e);
            throw e; // Propaga a exceção para que o cliente seja notificado do erro
        }
    }
}