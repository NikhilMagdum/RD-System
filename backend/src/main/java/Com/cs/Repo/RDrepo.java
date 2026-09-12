package Com.cs.Repo;


import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

import Com.cs.Entity.RDuser;

public interface RDrepo extends JpaRepository<RDuser,Long>{

	Optional<RDuser> findByName(String name);
}
