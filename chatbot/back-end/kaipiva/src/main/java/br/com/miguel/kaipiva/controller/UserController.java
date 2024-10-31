package br.com.miguel.kaipiva.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import br.com.miguel.kaipiva.models.UserModel;
import br.com.miguel.kaipiva.repository.*;
@RestController
@RequestMapping("/users")
public class UserController {
    private List<UserModel> users = new ArrayList<>();
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/cadastrar")
    public String cadastrarUsuario(@RequestBody UserModel user){
        userRepository.save(user);
        return "Sususususcessooo";
    }

    @PostMapping("/login")
    public String login(@RequestBody UserModel user){
        Optional<UserModel> userOptional = userRepository.findByEmail(user.getEmail());
        if(!userOptional.isPresent()){
            return "Encontrei nao";
        }

        if(!userOptional.get().getPassword().equals(user.getPassword())){
            return "Esqueceu a senha foi ?";

        }

        return "Sususususcessooo no login";
    }

    @PostMapping("/add-user")
    public String addUser(@RequestBody UserModel user){
        users.add(user);
        return "user added successfully";

    }
}
