package com.khoinguyen.orderfood.repository;

import com.khoinguyen.orderfood.dto.response.dashbord.DailyRevenueDTO;
import com.khoinguyen.orderfood.enums.Status;
import com.khoinguyen.orderfood.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    Page<Order> findByStatus(Status status, Pageable pageable);
    Page<Order> findByUserId(Long id,Pageable pageable);
    Page<Order> findByUserIdAndStatus(Long id,Status status,Pageable pageable);
    @Query("SELECT DATE(o.createdAt) as date, SUM(o.totalPrice) as total " +
            "FROM Order o " +
            "WHERE MONTH(o.createdAt) = :month AND YEAR(o.createdAt) = :year AND o.status = 'DELIVERED' " +
            "GROUP BY DATE(o.createdAt) " +
            "ORDER BY DATE(o.createdAt)")
    List<DailyRevenueDTO> getDailyRevenueByMonth(@Param("month") int month, @Param("year") int year);
}
