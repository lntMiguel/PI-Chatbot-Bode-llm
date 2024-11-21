package br.com.miguel.kaipiva.controller;
import java.util.Optional;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import br.com.miguel.kaipiva.models.UserModel;
import br.com.miguel.kaipiva.repository.*;
@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarUsuario(@RequestBody UserModel user) {
        try {
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Cadastro feito com sucesso");
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro: E-mail já cadastrado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar usuário");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserModel user){
        Optional<UserModel> userOptional = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if(!userOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha ou Email Incorreto!");
        }

        if(!userOptional.get().getPassword().equals(user.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha ou Email Incorreto");

        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Login feito com sucesso");
    }

   /*  @PostMapping("/add-user")
    public String addUser(@RequestBody UserModel user){
        users.add(user);
        return "user added successfully";

    }*/
}
