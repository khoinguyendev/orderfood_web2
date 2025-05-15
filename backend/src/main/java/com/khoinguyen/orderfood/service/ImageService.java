package com.khoinguyen.orderfood.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.khoinguyen.orderfood.model.Image;
import com.khoinguyen.orderfood.repository.ImageRepository;
import com.khoinguyen.orderfood.utils.PageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
//    private final RedisService redisService;
    public List<Image> saveAll(List<Image> images){
        return imageRepository.saveAll(images);
    }
    private static final String CACHE_KEY_PREFIX = "images:";

    public PageDTO<Image> getImages(Pageable pageable) {
//        String cacheKey = redisService.generateCacheKey(CACHE_KEY_PREFIX, pageable);
//
//        if (redisService.hasKey(cacheKey)) {
//            PageDTO<Image> pageDTO = redisService.readFromRedis(cacheKey, new TypeReference<PageDTO<Image>>() {});
//            return pageDTO != null ? pageDTO : new PageDTO<>(new ArrayList<>(), 0, pageable.getPageSize(), 0, 0); // Trả về PageDTO rỗng nếu có lỗi
//        } else {
//            Page<Image> images = imageRepository.findAll(pageable);
//            redisService.saveToRedis(cacheKey, new PageDTO<Image>(images.getContent(), images.getNumber(), images.getSize(), images.getTotalElements(), images.getTotalPages()));
//            return new PageDTO<Image>(images.getContent(), images.getNumber(), images.getSize(), images.getTotalElements(), images.getTotalPages());
//        }
        Page<Image> images = imageRepository.findAll(pageable);
//        redisService.saveToRedis(cacheKey, new PageDTO<Image>(images.getContent(), images.getNumber(), images.getSize(), images.getTotalElements(), images.getTotalPages()));
        return new PageDTO<Image>(images.getContent(), images.getNumber(), images.getSize(), images.getTotalElements(), images.getTotalPages());

    }
    public String deleteImage(String publicId){
        Image image=imageRepository.findByPublicId(publicId);
        if(image==null) return "Not found";
        imageRepository.delete(image);
//        redisService.deleteKeysByPrefix("images");
        return "Xóa thành công";
    }

}
