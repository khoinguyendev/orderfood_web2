package com.khoinguyen.orderfood.dto.response;


import lombok.Data;
@Data
public class ReviewResponse {
    private Long id;
    private UserResponse user;
    private String comment;
    private int rating;
    private boolean published;
    private ProductResponse product;
    private String createdAt;
}
