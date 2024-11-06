package br.com.miguel.kaipiva.repository;


import java.util.Optional;
import br.com.miguel.kaipiva.models.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserModel,String>{
    Optional<UserModel> findByEmailAndPassword(String email, String password);
}

