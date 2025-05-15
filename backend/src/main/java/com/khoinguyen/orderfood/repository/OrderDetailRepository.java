package com.khoinguyen.orderfood.repository;


import com.khoinguyen.orderfood.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
}
