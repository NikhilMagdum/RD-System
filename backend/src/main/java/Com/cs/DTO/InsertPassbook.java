package Com.cs.DTO;
import java.time.LocalDate;

public class InsertPassbook {

    private Long pid;

    // Actual payment date
    private LocalDate rddate;

    // Monthly due date
    private LocalDate dueDate;

    private Integer rdamt;

    private Integer lday;

    private Long famt;

    private Long rid;


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


    public Long getRid() {
        return rid;
    }

    public void setRid(Long rid) {
        this.rid = rid;
    }
}