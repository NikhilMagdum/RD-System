
package Com.cs.DTO;

import java.time.LocalDate;

public class Passbookdto {

    private Long pid;

    // Actual payment date
    private LocalDate rddate;

    // Scheduled installment due date
    private LocalDate dueDate;

    private Integer rdamt;

    private Integer lday;

    private Long famt;

    // Year cycle: 0 = first year, 1 = second year, etc.
    private Integer flg;

    // Installment number: 1 to 12
    private Integer installmentNo;

    private Long rid;

    private String name;


    public Passbookdto() {
    }


    public Passbookdto(
            Long pid,
            LocalDate rddate,
            LocalDate dueDate,
            Integer rdamt,
            Integer lday,
            Long famt,
            Integer flg,
            Integer installmentNo,
            Long rid,
            String name) {

        this.pid = pid;
        this.rddate = rddate;
        this.dueDate = dueDate;
        this.rdamt = rdamt;
        this.lday = lday;
        this.famt = famt;
        this.flg = flg;
        this.installmentNo = installmentNo;
        this.rid = rid;
        this.name = name;
    }


    public Long getPid() {
        return pid;
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


    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
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


    public Integer getInstallmentNo() {
        return installmentNo;
    }

    public void setInstallmentNo(Integer installmentNo) {
        this.installmentNo = installmentNo;
    }


    public Long getRid() {
        return rid;
    }

    public void setRid(Long rid) {
        this.rid = rid;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
