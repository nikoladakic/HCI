package uns.ac.rs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uns.ac.rs.model.User;
import uns.ac.rs.service.UserService;

/**
 * Created by daka on 4/12/18.
 */

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping(value = "/registration", consumes = "application/json", produces = "application/json")
    public ResponseEntity registration(@RequestBody User user) throws Exception{

        User checkUser = userService.registration(user);

        if(checkUser == null){ return new ResponseEntity<User>(new User(), HttpStatus.NO_CONTENT); }

        return new ResponseEntity<User>(checkUser, HttpStatus.OK);

    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "text/plain")
    public String login(@RequestBody User user) throws Exception{

        return userService.login(user.getUsername(), user.getPassword());
    }

}
