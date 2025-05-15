package com.khoinguyen.orderfood.controller;


import com.khoinguyen.orderfood.dto.request.CreateOrderReq;
import com.khoinguyen.orderfood.dto.request.UpdateOrderReq;
import com.khoinguyen.orderfood.dto.response.ApiResponse;
import com.khoinguyen.orderfood.dto.response.OrderResponse;
import com.khoinguyen.orderfood.enums.Status;
import com.khoinguyen.orderfood.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/orders")
@AllArgsConstructor
public class OrderController {
    private final OrderService orderService;
    @PostMapping
    ApiResponse<OrderResponse> createOrder(@RequestBody CreateOrderReq categoryReq) {
        ApiResponse<OrderResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(orderService.createOrder(categoryReq));
        return apiResponse;

    }
    @GetMapping("/by-me")
    ApiResponse<Page<OrderResponse>> getOrdersByMe(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Status status,
            @RequestParam(defaultValue = "id,desc") String sort)
    {
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));

        ApiResponse<Page<OrderResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setData(orderService.getOrderByMe(status,pageable));
        return apiResponse;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    ApiResponse<Page<OrderResponse>> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,asc") String sort,
            @RequestParam(required = false) Status status) // Thêm status
    {
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));

        ApiResponse<Page<OrderResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setData(orderService.getOrdersByStatus(status, pageable));
        return apiResponse;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{orderId}")
    ApiResponse<OrderResponse> updateCategory(@PathVariable Long orderId, @RequestBody UpdateOrderReq req) {
        ApiResponse<OrderResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(orderService.updateOrder(orderId, req));
        return apiResponse;
    }
//    @MessageMapping("/order")
//    @SendTo("/admin/order")  // Endpoint WebSocket để client subscribe
//    public String sendNotification(String message) {
//        System.out.println("Received order: " + message);
//        return "New Order: " + message;
//    }
}
