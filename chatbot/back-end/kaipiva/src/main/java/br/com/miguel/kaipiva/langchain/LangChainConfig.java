package br.com.miguel.kaipiva.langchain;

import java.time.Duration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import static dev.langchain4j.data.document.splitter.DocumentSplitters.recursive;
import static dev.langchain4j.data.document.loader.FileSystemDocumentLoader.loadDocument;

import dev.langchain4j.data.document.parser.TextDocumentParser;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.memory.chat.ChatMemoryProvider;
import dev.langchain4j.memory.chat.TokenWindowChatMemory;
import dev.langchain4j.model.Tokenizer;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.model.embedding.onnx.allminilml6v2.AllMiniLmL6V2EmbeddingModel;
import dev.langchain4j.model.ollama.OllamaChatModel;
import dev.langchain4j.model.ollama.OllamaStreamingChatModel;
import dev.langchain4j.rag.content.retriever.ContentRetriever;
import dev.langchain4j.rag.content.retriever.EmbeddingStoreContentRetriever;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;
import dev.langchain4j.store.embedding.inmemory.InMemoryEmbeddingStore;

@Configuration
public class LangChainConfig {
    @Bean
    public OllamaChatModel chatLanguageModel() {
        return OllamaChatModel.builder()
                .baseUrl("http://localhost:11434") // Porta em que a IA roda
                .modelName("splitpierre/bode-alpaca-pt-br")// Deve coincidir com o que está no application.properties
                .temperature(0.8)
                .timeout(Duration.ofSeconds(60))
                .build();
    }

    @Bean
    public OllamaStreamingChatModel streamingChatModel() {
        return OllamaStreamingChatModel.builder()
                .baseUrl("http://localhost:11434") // O mesmo URL
                .modelName("splitpierre/bode-alpaca-pt-br")// O mesmo nome do modelo
                .temperature(0.8)
                .timeout(Duration.ofSeconds(60))
                .build();
    }

    @Bean
    EmbeddingModel embeddingModel() {
        return new AllMiniLmL6V2EmbeddingModel();
    }

    @Bean
    EmbeddingStore<TextSegment> embeddingStore() {
        return new InMemoryEmbeddingStore<>();
    }

    
 


    // In the real world, ingesting documents would often happen separately, on a CI
    // server or similar
    @Bean
    CommandLineRunner ingestDocsForLangChain(
            EmbeddingModel embeddingModel,
            EmbeddingStore<TextSegment> embeddingStore,
            Tokenizer tokenizer, // Tokenizer is provided by langchain4j-open-ai-spring-boot-starter
            ResourceLoader resourceLoader) {
        return args -> {
            var resource = resourceLoader.getResource("classpath:sobreSenac.txt");
            var termsOfUse = loadDocument(resource.getFile().toPath(), new TextDocumentParser());
            var ingestor = EmbeddingStoreIngestor.builder()
                    .documentSplitter(recursive(50, 0, tokenizer))
                    .embeddingModel(embeddingModel)
                    .embeddingStore(embeddingStore)
                    .build();
            ingestor.ingest(termsOfUse);
        };
    }

    @Bean
    ContentRetriever contentRetriever(
            EmbeddingStore<TextSegment> embeddingStore,
            EmbeddingModel embeddingModel) {
        return EmbeddingStoreContentRetriever.builder()
                .embeddingStore(embeddingStore)
                .embeddingModel(embeddingModel)
                .maxResults(2)
                .minScore(0.6)
                .build();
    }

    @Bean
    ChatMemoryProvider chatMemoryProvider(Tokenizer tokenizer) {
        // Tokenizer is provided by langchain4j-open-ai-spring-boot-starter
        return chatId -> TokenWindowChatMemory.withMaxTokens(1000, tokenizer);
    }
}
