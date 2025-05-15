package com.khoinguyen.orderfood.utils;

import com.khoinguyen.orderfood.model.Product;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.List;

public class ProductSpecification {
    public static Specification<Product> filterByCategoriesAndPrice(List<Long> categoryIds, BigDecimal minPrice, BigDecimal maxPrice) {
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Predicate predicate = cb.conjunction(); // Khởi tạo điều kiện mặc định (true)

            // 🛠 Sửa chỗ này: dùng get("category") thay vì join("categories")
            if (categoryIds != null && !categoryIds.isEmpty()) {
                predicate = cb.and(predicate, root.get("category").get("id").in(categoryIds));
            }

            if (minPrice != null) {
                predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            predicate=cb.and(predicate, cb.equal(root.get("available"), true));
            return predicate;
        };
    }
}
