package com.khoinguyen.orderfood.dto.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderDetailReq {
    private Long productId;
    private int quantity;
    private BigDecimal price;
    private String message;
}
