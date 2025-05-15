package com.khoinguyen.orderfood.mapper;

import com.khoinguyen.orderfood.dto.request.CreateOrderReq;
import com.khoinguyen.orderfood.dto.request.UpdateOrderReq;
import com.khoinguyen.orderfood.dto.response.OrderResponse;
import com.khoinguyen.orderfood.model.Order;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order toOrder(CreateOrderReq createOrderReq);
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "orderDetails", ignore = true)
    @Mapping(target = "createdAt", expression = "java(order.getCreatedAt() != null ? order.getCreatedAt().toString() : null)")
    OrderResponse toOrderResponse(Order order);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void setUpdateOrderReq(UpdateOrderReq updateOrderReq, @MappingTarget Order order);
}
