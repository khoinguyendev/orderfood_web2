package com.khoinguyen.orderfood.dto.request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CreateOrderReq {
    private Long userId;
    private BigDecimal totalPrice;
    private String status;
    private String phone;
    private String address;

    private String paymentMethod;
    private List<OrderDetailReq> orderDetails;
}
