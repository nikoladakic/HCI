package uns.ac.rs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uns.ac.rs.model.User;
import uns.ac.rs.repository.UserRepository;
import uns.ac.rs.security.JWT;

import java.util.Date;

/**
 * Created by daka on 4/12/18.
 */

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String login(String username, String password){

        String response = null;
        User user = userRepository.findOneByUsernameAndPassword(username, password);

        if(!(user == null)){
            String token = JWT.createJWT(user.getUsername());
            response = token;
        }

        return response;
    }

    public User registration(User user) throws Exception{

        User alreadyExist = userRepository.findOneByUsername(user.getUsername());

        if(alreadyExist != null){ return null;}

        User new_user = userRepository.save(user);
        new_user.setPassword("sensitive-data");

        return new_user;

    }

    public User findUserByUsername(String username)throws Exception{
        return userRepository.findOneByUsername(username);
    }

    public User saveUser(User user) throws Exception{
        return userRepository.save(user);
    }

}
