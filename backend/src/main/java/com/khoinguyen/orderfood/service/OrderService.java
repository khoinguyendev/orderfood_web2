package com.khoinguyen.orderfood.service;

import com.khoinguyen.orderfood.dto.request.CreateOrderReq;
import com.khoinguyen.orderfood.dto.request.OrderDetailReq;
import com.khoinguyen.orderfood.dto.request.UpdateOrderReq;
import com.khoinguyen.orderfood.dto.response.OrderDetailResponse;
import com.khoinguyen.orderfood.dto.response.OrderResponse;
import com.khoinguyen.orderfood.enums.PaymentMethod;
import com.khoinguyen.orderfood.enums.Status;
import com.khoinguyen.orderfood.exception.NotFound;
import com.khoinguyen.orderfood.mapper.OrderDetailMapper;
import com.khoinguyen.orderfood.mapper.OrderMapper;
import com.khoinguyen.orderfood.mapper.ProductMapper;
import com.khoinguyen.orderfood.mapper.UserMapper;
import com.khoinguyen.orderfood.model.*;
import com.khoinguyen.orderfood.repository.OrderDetailRepository;
import com.khoinguyen.orderfood.repository.OrderRepository;
import com.khoinguyen.orderfood.repository.ProductRepository;
import com.khoinguyen.orderfood.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final NotificationService notificationService;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;
    private final UserMapper userMapper;
    private final ProductMapper productMapper;
    private final OrderDetailMapper orderDetailMapper;
    private final OrderDetailRepository orderDetailRepository;

    public OrderResponse createOrder(CreateOrderReq request) {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByEmail(name).orElseThrow(() -> new NotFound("User not found"));

        // Tạo Order mới
        Order order = Order.builder()
                .user(user)
                .totalPrice(request.getTotalPrice())
                .status(Status.valueOf(request.getStatus()))
                .phone(request.getPhone())
                .address(request.getAddress())
                .paymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()))
                .build();
        order = orderRepository.save(order);

        // Lưu danh sách OrderDetail
        List<OrderDetail> orderDetails=new ArrayList<>();
        for (OrderDetailReq detailReq : request.getOrderDetails()) {
            Product product = productRepository.findById(detailReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product không tồn tại"));

            OrderDetail orderDetail = OrderDetail.builder()
                    .order(order)
                    .product(product)
                    .quantity(detailReq.getQuantity())
                    .price(detailReq.getPrice())
                    .message(detailReq.getMessage())
                    .build();

            orderDetails.add(orderDetailRepository.save(orderDetail));
        }
        order.setOrderDetails(orderDetails);
        OrderResponse orderResponse=convertToOrderResponse(order);
        notificationService.sendOrderNotification(orderResponse);
        return orderResponse;
    }
    public OrderResponse updateOrder(Long id,UpdateOrderReq req){
        Order order=orderRepository
                .findById(id)
                .orElseThrow(()->new NotFound("Order not found"));
        orderMapper.setUpdateOrderReq(req,order);
        order = orderRepository.save(order);
        OrderResponse orderResponse=convertToOrderResponse(order);
        notificationService.sendOrderNotificationClient(orderResponse);
        return orderResponse;
    }
    public Page<OrderResponse> getOrdersByStatus(Status status, Pageable pageable) {
        Page<Order> orders = (status == null) ? orderRepository.findAll(pageable) : orderRepository.findByStatus(status, pageable);
        return orders.map(this::convertToOrderResponse);
    }

    public Page<OrderResponse> getOrderByMe(Status status,Pageable pageable){
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByEmail(name).orElseThrow(() -> new NotFound("User not found"));
        if(status!=null){
            Page<Order> orders = orderRepository.findByUserIdAndStatus(user.getId(),status, pageable);
            return orders.map(this::convertToOrderResponse);

        }else{
            Page<Order> orders = orderRepository.findByUserId(user.getId(), pageable);
            return orders.map(this::convertToOrderResponse);
        }
        

    }
    private OrderResponse convertToOrderResponse(Order order) {
        OrderResponse response = orderMapper.toOrderResponse(order);
        response.setUser(userMapper.toUserResponse(order.getUser()));
        response.setOrderDetails(
                order.getOrderDetails()
                        .stream()
                        .map(this::convertToOrderDetailResponse)
                        .collect(Collectors.toList())
        );
        return response;
    }

    private OrderDetailResponse convertToOrderDetailResponse(OrderDetail orderDetail) {
        OrderDetailResponse orderDetailResponse = orderDetailMapper.toOrderDetailResponse(orderDetail);
        orderDetailResponse.setProduct(productMapper.toProductResponse(orderDetail.getProduct()));
        return orderDetailResponse;
    }

}
