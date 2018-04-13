package uns.ac.rs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uns.ac.rs.model.User;

/**
 * Created by daka on 4/12/18.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    User findOneByUsernameAndPassword(String username, String password);

    User findOneByUsername(String username);

}
