package com.khoinguyen.orderfood.repository;

import com.khoinguyen.orderfood.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image,Long> {
    Image findByPublicId(String id);
}
