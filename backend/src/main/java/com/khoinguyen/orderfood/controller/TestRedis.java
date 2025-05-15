//package com.khoinguyen.orderfood.controller;
//
//import com.khoinguyen.orderfood.service.RedisService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/redis")
//@RequiredArgsConstructor
//public class TestRedis {
//
//    private final RedisService redisService;
//    private final RedisTemplate<String, Object> redisTemplate;
//
//    @GetMapping("/set")
//    public String setKey(@RequestParam String key, @RequestParam String value) {
//        redisService.saveToRedis(key, value);
//        return "Key-value pair saved in Redis";
//    }
//
//    @GetMapping("/get")
//    public String getKey(@RequestParam String key) {
//        return redisService.getFromRedis(key);
//    }
//
//    @GetMapping("/redis-test")
//    public ResponseEntity<String> testRedis() {
//        try {
//            redisTemplate.opsForValue().set("test", "value");
//            String value = (String) redisTemplate.opsForValue().get("test");
//            return ResponseEntity.ok("Redis working. Test value: " + value);
//        } catch (Exception e) {
//            return ResponseEntity.status(500)
//                    .body("Redis connection failed: " + e.getMessage());
//        }
//    }
//}
