package com.khoinguyen.orderfood.dto.response;
import lombok.Data;
import java.util.List;
@Data
public class OrderResponse {
    private Long id;
    private UserResponse user;
    private Double totalPrice;
    private String status;
    private String phone;
    private String address;

    private String paymentMethod;
    private List<OrderDetailResponse> orderDetails;
    private String createdAt;

}
