//package com.khoinguyen.orderfood.service;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.stereotype.Service;
//
//import java.util.Set;
//
//@Service
//@RequiredArgsConstructor
//public class RedisService {
//
//    private final RedisTemplate<String, Object> redisTemplate;
//    private final ObjectMapper objectMapper;
//    public void saveToRedis(String key, String value) {
//        redisTemplate.opsForValue().set(key, value); // Lưu giá trị vào Redis
//    }
//
//    public String getFromRedis(String key) {
//        return (String) redisTemplate.opsForValue().get(key); // Lấy giá trị từ Redis
//    }
//
////    private static final long CACHE_EXPIRATION_TIME = 3600L; // Thời gian hết hạn cache, ví dụ: 1 giờ (3600 giây)
//
//    // Phương thức tạo key cache
//    public String generateCacheKey(String prefix, Pageable pageable) {
//        return prefix + ":" + pageable.getPageNumber() + ":" + pageable.getPageSize() + ":" + pageable.getSort();
//    }
//
//    // Phương thức đọc dữ liệu từ Redis
//    public <T> T readFromRedis(String key, TypeReference<T> typeReference)  {
//        String jsonData = (String) redisTemplate.opsForValue().get(key);
//
//        if (jsonData != null) {
//            // Deserialize the JSON string into the specified type (e.g., PageDTO<Category>)
//            try {
//                return objectMapper.readValue(jsonData, typeReference);
//            } catch (JsonProcessingException e) {
//                throw new RuntimeException(e);
//            }
//        }
//        return null;
//    }
//
//    // Phương thức lưu dữ liệu vào Redis
//    public <T> void saveToRedis(String key, T value) {
//        try {
//            String jsonData = objectMapper.writeValueAsString(value);
//            redisTemplate.opsForValue().set(key, jsonData);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    // Phương thức kiểm tra xem key có tồn tại trong Redis hay không
//    public boolean hasKey(String key) {
//        return redisTemplate.hasKey(key);
//    }
//    public void deleteKeysByPrefix(String prefix) {
//        Set<String> keys = redisTemplate.keys(prefix + "*");
//        if (!keys.isEmpty()) {
//            redisTemplate.delete(keys);
//        }
//    }
//}
