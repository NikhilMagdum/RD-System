package Com.cs.Entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class RDuser {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long rid;

	    @NotBlank(message = "Name is required")
	    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
	    private String name;

	    @NotBlank(message = "Address is required")
	    @Size(max = 200, message = "Address must not exceed 200 characters")
	    private String address;

	    @NotNull(message = "Date of birth is required")
	    @Past(message = "Date of birth must be in the past")
	    @Column(name = "dob")
	    private LocalDate dob;

	    @NotBlank(message = "Gender is required")
	    private String gender;

	    @NotNull(message = "RD date is required")
	    @PastOrPresent(message = "RD date cannot be a future date")
	    @Column(name = "rddate")
	    private LocalDate rddate;

	    @Min(value = 1, message = "RD amount must be greater than 0")
	    private int rdamt;

	    @NotBlank(message = "Occupation is required")
	    private String occupation;

	    @NotBlank(message = "Account number is required")
	    private String acno;

	    @NotBlank(message = "Aadhar number is required")
	    @Pattern(regexp = "^[0-9]{12}$",
	             message = "Aadhar number must contain exactly 12 digits")
	    @Column(name = "adharno", unique = true, nullable = false)
	    private String adharno;

	    @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
	             message = "Invalid PAN number")
	    private String panno;

	    @NotBlank(message = "Nominee name is required")
	    private String nname;

	    @NotBlank(message = "Nominee address is required")
	    private String naddr;

	    @Pattern(regexp = "^[0-9]{12}$",
	             message = "Nominee Aadhar number must contain exactly 12 digits")
	    private String nadharno;

	    @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
	             message = "Invalid nominee PAN number")
	    private String npanno;

	public Long getRid() {
		return rid;
	}

	public void setRid(Long rid) {
		this.rid = rid;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public LocalDate getRddate() {
		return rddate;
	}

	public void setRddate(LocalDate rddate) {
		this.rddate = rddate;
	}

	public int getRdamt() {
		return rdamt;
	}

	public void setRdamt(int rdamt) {
		this.rdamt = rdamt;
	}
	
	public String getOccupation() {
	    return occupation;
	}

	public void setOccupation(String occupation) {
	    this.occupation = occupation;
	}

	public String getAdharno() {
		return adharno;
	}

	public void setAdharno(String adharno) {
		this.adharno = adharno;
	}

	public String getPanno() {
		return panno;
	}

	public void setPanno(String panno) {
		this.panno = panno;
	}

	public String getNname() {
		return nname;
	}

	public void setNname(String nname) {
		this.nname = nname;
	}

	public String getNaddr() {
		return naddr;
	}

	public void setNaddr(String naddr) {
		this.naddr = naddr;
	}

	public String getNadharno() {
		return nadharno;
	}

	public void setNadharno(String nadharno) {
		this.nadharno = nadharno;
	}

	public String getNpanno() {
		return npanno;
	}

	public void setNpanno(String npanno) {
		this.npanno = npanno;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAcno() {
		return acno;
	}

	public void setAcno(String acno) {
		this.acno = acno;
	}
	

}
