package com.khoinguyen.orderfood.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.khoinguyen.orderfood.model.Review;
@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    Page<Review> findByProductIdAndPublished(Long id,boolean pub,Pageable pageable);
}
