package Com.cs.DTO;

import java.time.LocalDate;

public class PassbokAllusers {
	private Long pid;
	private LocalDate rddate;
	private Integer rdamt;
	private Integer lday;
	private Long famt;
	private Integer flg;
	private Long rid;
	public Long getPid() {
		return pid;
	}
	
	public PassbokAllusers(Long pid, LocalDate rddate, Integer rdamt, Integer lday, Long famt, Integer flg, Long rid) {
		super();
		this.pid = pid;
		this.rddate = rddate;
		this.rdamt = rdamt;
		this.lday = lday;
		this.famt = famt;
		this.flg = flg;
		this.rid = rid;
	}

	public void setPid(Long pid) {
		this.pid = pid;
	}
	public LocalDate getRddate() {
		return rddate;
	}
	public void setRddate(LocalDate rddate) {
		this.rddate = rddate;
	}
	public Integer getRdamt() {
		return rdamt;
	}
	public void setRdamt(Integer rdamt) {
		this.rdamt = rdamt;
	}
	public Integer getLday() {
		return lday;
	}
	public void setLday(Integer lday) {
		this.lday = lday;
	}
	public Long getFamt() {
		return famt;
	}
	public void setFamt(Long famt) {
		this.famt = famt;
	}
	public Integer getFlg() {
		return flg;
	}
	public void setFlg(Integer flg) {
		this.flg = flg;
	}
	public Long getRid() {
		return rid;
	}
	public void setRid(Long rid) {
		this.rid = rid;
	}
	
	
}
