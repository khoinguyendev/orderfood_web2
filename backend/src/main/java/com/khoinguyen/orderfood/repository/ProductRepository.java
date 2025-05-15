package com.khoinguyen.orderfood.repository;

import com.khoinguyen.orderfood.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {
    boolean existsByName(String name);
    Page<Product> findByCategoryId(Long id,Pageable pageable);
    Page<Product> findByAvailable(Pageable pageable, boolean available);
    Page<Product> findByCategoryIdAndAvailableTrue(Long categoryId,Pageable pageable);
//    @Query(value = "SELECT * FROM products " +
//            "WHERE MATCH(name) AGAINST (:keyword IN BOOLEAN MODE) " +
//            "AND available = true",
//            nativeQuery = true)
//    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
    @Query(
            value = "SELECT * FROM products " +
                    "WHERE (name LIKE %:keyword%) " +
                    "AND available = true",
            nativeQuery = true
    )
    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
