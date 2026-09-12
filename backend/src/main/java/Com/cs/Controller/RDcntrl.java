package Com.cs.Controller;

import java.util.List;




import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Com.cs.DTO.AdminLoginRequest;
import Com.cs.Entity.Admin;
import Com.cs.Entity.RDuser;
import Com.cs.Repo.AdminRepository;
import Com.cs.Repo.RDrepo;
@CrossOrigin(origins = "http://localhost:5173")

@RestController
public class RDcntrl {
	@Autowired
	private RDrepo rdrepo;
	
	@Autowired
	private AdminRepository adminRepository;

	@GetMapping("/getAllrdusers")
	public List<RDuser> rduser() {
		List<RDuser> list = rdrepo.findAll();
		return list;
	}
	
	@GetMapping("/FindByName/{name}")
	public Optional<RDuser> rduserByname(@PathVariable("name") String name) {
		return rdrepo.findByName(name);
	}

	@PostMapping("/InsertRDuser")
	public String insertRecord(@RequestBody RDuser user) {
		rdrepo.save(user);
		return "Insert record successfull";
	}
	

	@GetMapping("/FindById/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {

	    Optional<RDuser> user = rdrepo.findById(id);

	    if (user.isEmpty()) {
	        return ResponseEntity
	                .status(HttpStatus.NOT_FOUND)
	                .body("RD User not found");
	    }

	    return ResponseEntity.ok(user.get());
	}
	
	@PatchMapping("/UpdateById/{id}")
	public String updateById(@RequestBody RDuser user, @PathVariable("id") long id) {

	    RDuser existingUser = rdrepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Record not found"));

	    existingUser.setName(user.getName());
	    existingUser.setName(user.getOccupation());
	    existingUser.setAcno(user.getAcno());
	    existingUser.setAddress(user.getAddress());
	    existingUser.setAdharno(user.getAdharno());
	    existingUser.setDob(user.getDob());
	    existingUser.setGender(user.getGender());
	    existingUser.setPanno(user.getPanno());
	    existingUser.setRdamt(user.getRdamt());
	    existingUser.setRddate(user.getRddate());
	    existingUser.setNname(user.getNname());
	    existingUser.setNadharno(user.getNadharno());
	    existingUser.setNpanno(user.getNpanno());
	    existingUser.setNaddr(user.getNaddr());

	    rdrepo.save(existingUser);

	    return "Record Updated";
	}

	@PutMapping("/Update")
	public String updaterduser(@RequestBody RDuser user) {
		rdrepo.save(user);
		return " Record Updated";
	}
	
	@DeleteMapping("/DeleteById/{id}")
	public String deleteById(@PathVariable("id") Long id) {
		rdrepo.deleteById(id);
		return "Record delete successfull";
	}
	
	@PostMapping("/admin/login")
	public ResponseEntity<?> adminLogin(
	        @RequestBody AdminLoginRequest request) {

	    String phone = request.getPhone();

	    if (phone == null || phone.trim().isEmpty()) {
	        return ResponseEntity
	                .badRequest()
	                .body("Phone number is required");
	    }

	    phone = phone.trim();

	    if (!phone.matches("\\d{10}")) {
	        return ResponseEntity
	                .badRequest()
	                .body("Phone number must contain exactly 10 digits");
	    }

	    Optional<Admin> admin =
	            adminRepository.findByPhone(phone);

	    if (admin.isEmpty()) {
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body("Invalid admin phone number");
	    }

	    return ResponseEntity.ok(admin.get());
	}
	
	@PostMapping("/admin/register")
	public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {

	    if (admin.getName() == null || admin.getName().trim().isEmpty()) {
	        return ResponseEntity
	                .badRequest()
	                .body("Admin name is required");
	    }

	    if (admin.getPhone() == null ||
	            !admin.getPhone().matches("\\d{10}")) {

	        return ResponseEntity
	                .badRequest()
	                .body("Phone number must contain exactly 10 digits");
	    }

	    if (adminRepository.findByPhone(admin.getPhone()).isPresent()) {
	        return ResponseEntity
	                .status(HttpStatus.CONFLICT)
	                .body("Admin phone number already exists");
	    }

	    Admin savedAdmin = adminRepository.save(admin);

	    return ResponseEntity
	            .status(HttpStatus.CREATED)
	            .body(savedAdmin);
	}
}
