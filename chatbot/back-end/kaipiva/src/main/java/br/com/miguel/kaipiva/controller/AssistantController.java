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

   private static final Logger logger = LoggerFactory.getLogger(AssistantController.class);
    
    private final AssistantService assistantService;

    public AssistantController(AssistantService assistantService) {
        this.assistantService = assistantService;
    }

    @PostMapping(value = "/chat", produces = MediaType.TEXT_PLAIN_VALUE)
    public Flux<String> chat(@RequestParam String chatId, @RequestParam String message) {
        try {
            logger.info("Recebida mensagem do chatId: {}", chatId);
            return assistantService.chat(chatId, message);
        } catch (Exception e) {
            logger.error("Erro ao processar a mensagem do chatId: {}", chatId, e);
            throw e; // Re-lançar a exceção após o log
        }
    }
}
