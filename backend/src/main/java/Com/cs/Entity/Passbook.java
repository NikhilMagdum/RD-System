package Com.cs.Entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Entity
public class Passbook {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long pid;
	
	@PastOrPresent(message  = "RD date cannot be a future date")
	@Column(name="rddate")
	private  LocalDate rddate;
	
	@Column(name = "due_date")
	private LocalDate dueDate;
	
	@Min(message="RD amount must be greater than 0", value = 1)
	private int rdamt;
	
	@PositiveOrZero(message = "Lday cannot be negative")
	private int lday;
	
    @PositiveOrZero(message="Fine amount cannot be negative")
	private long famt;
    
    @PositiveOrZero(message=" Flag cannot be negative")
    private int flg;
    
    private int installmentNo;

	@ManyToOne
	@JoinColumn(name="rid",nullable = false)
	private RDuser  rduser;
	public long getPid() {
		return pid;
	}
	public void setPid(long pid) {
		this.pid = pid;
	}
	public LocalDate getRddate() {
		return rddate;
	}
	
	public LocalDate getDueDate() {
		return dueDate;
	}
	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
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
	public int getLday() {
		return lday;
	}
	public void setLday(int lday) {
		this.lday = lday;
	}
	public long getFamt() {
		return famt;
	}
	public void setFamt(long famt) {
		this.famt = famt;
	}
	public int getFlg() {
		return flg;
	}
	public void setFlg(int flg) {
		this.flg = flg;
	}
	@JsonIgnore
	public RDuser getRDuser() {
		return rduser;
	}
	public void setRDuser(RDuser rduser) {
		this.rduser = rduser;
	}
	
	public int getInstallmentNo() {
		return installmentNo;
	}
	public void setInstallmentNo(int installmentNo) {
		this.installmentNo = installmentNo;
	}
	
	
	
}
