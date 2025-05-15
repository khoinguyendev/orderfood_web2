package com.khoinguyen.orderfood.dto.response;


import lombok.Data;

import java.math.BigDecimal;
@Data
public class OrderDetailResponse {
    private Long id;
    private ProductResponse product;
    private int quantity;
    private String message;
    private BigDecimal price;
}
