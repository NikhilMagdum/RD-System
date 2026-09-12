package Com.cs.Repo;

import java.time.LocalDate;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import Com.cs.DTO.Passbookdto;
import Com.cs.Entity.Passbook;

public interface Passbookrepo extends JpaRepository<Passbook, Long> {

    int countByRduser_Rid(Long rid);

    boolean existsByRduser_RidAndDueDate(
            Long rid,
            LocalDate dueDate
    );

    @Query(
        value = "SELECT passbook.pid, " +
                "passbook.rddate, " +
                "passbook.due_date, " +
                "passbook.rdamt, " +
                "passbook.lday, " +
                "passbook.famt, " +
                "passbook.flg, " +
                "passbook.installment_no, " +
                "rduser.rid, " +
                "rduser.name " +
                "FROM rduser " +
                "INNER JOIN passbook on passbook.rid = rduser.rid  " +
                "WHERE rduser.rid = :rid " +
                "ORDER BY passbook.due_date ASC",
        nativeQuery = true )
    List<Passbookdto> getPassbookByid(
            @Param("rid") Long rid
    );
}
