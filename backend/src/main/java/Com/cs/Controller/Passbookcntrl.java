package Com.cs.Controller;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import Com.cs.DTO.InsertPassbook;
import Com.cs.DTO.Passbookdto;
import Com.cs.Entity.Passbook;
import Com.cs.Entity.RDuser;
import Com.cs.Repo.Passbookrepo;
import Com.cs.Repo.RDrepo;

@RestController
public class Passbookcntrl {
	@Autowired
	private Passbookrepo passbookrepo;
	@Autowired
	private RDrepo rdrepo;

	@GetMapping("/getAlluserPassbook")
	public List<Passbook> findAll() {
		return passbookrepo.findAll();
	}

	@GetMapping("/getPassbook/{id}")
	public Passbook getPassbook(@PathVariable Long id) {
		return passbookrepo.findById(id).orElseThrow(() -> new RuntimeException("Passbook not found"));
	}

	@PatchMapping("UpdatePassbook/{id}")
	public Passbook updatepassbookByid(@RequestBody Passbook passbook, @PathVariable("id") long id) {
		return passbookrepo.save(passbook);
	}

	@DeleteMapping("DeletePassbook/{id}")
	public String deleteByid(@PathVariable("id") long id) {
		passbookrepo.deleteById(id);
		return " Id delete successfull";
	}

	@GetMapping("/getPassbookByid/{rid}")
	public List<Passbookdto> getPsbk(@PathVariable("rid")Long rid) {
		return passbookrepo.getPassbookByid(rid);
	}

	
	@PostMapping("/InsertPassbook")
	public Passbook Insert(@RequestBody InsertPassbook dto) {

	    RDuser rduser = rdrepo.findById(dto.getRid())
	            .orElseThrow(() -> new RuntimeException("RD User not found"));

	    LocalDate dueDate = dto.getDueDate();
	    LocalDate paymentDate = dto.getRddate();

	    if (dueDate == null || paymentDate == null) {
	        throw new RuntimeException("Due date and payment date are required");
	    }

	    if (paymentDate.isBefore(dueDate)) {
	        throw new RuntimeException("Payment date cannot be before due date");
	    }

	    if (passbookrepo.existsByRduser_RidAndDueDate(dto.getRid(), dueDate)) {
	        throw new RuntimeException("This installment is already paid");
	    }

	    LocalDate startDate = rduser.getRddate();

	    if (dueDate.isBefore(startDate)) {
	        throw new RuntimeException("Due date cannot be before RD start date");
	    }

	    if (dueDate.getDayOfMonth() != startDate.getDayOfMonth()) {
	        throw new RuntimeException("Invalid due date for this RD account");
	    }

	    long months = ChronoUnit.MONTHS.between(
	            YearMonth.from(startDate),
	            YearMonth.from(dueDate)
	    );

	    int installmentNo = (int) (months % 12) + 1;

	    int flg = (int) (months / 12);

	    long lateDays = ChronoUnit.DAYS.between(
	            dueDate,
	            paymentDate
	    );

	    if (lateDays < 0) {
	        lateDays = 0;
	    }

	    long fine = lateDays * 50L;

	    Passbook passbook = new Passbook();

	    passbook.setDueDate(dueDate);
	    passbook.setRddate(paymentDate);
	    passbook.setRdamt(dto.getRdamt());

	    passbook.setLday((int) lateDays);
	    passbook.setFamt(fine);

	    passbook.setFlg(flg);
	    passbook.setInstallmentNo(installmentNo);

	    passbook.setRDuser(rduser);

	    return passbookrepo.save(passbook);
	}
	
	@PutMapping("/update")
	public Passbook Addpsbk(@RequestBody Passbook passbook) {
		return passbookrepo.save(passbook);
	}

}
