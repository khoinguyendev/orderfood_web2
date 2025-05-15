package com.khoinguyen.orderfood.mapper;

import com.khoinguyen.orderfood.dto.response.OrderDetailResponse;
import com.khoinguyen.orderfood.model.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {

    @Mapping(target = "product", ignore = true)
    OrderDetailResponse toOrderDetailResponse(OrderDetail orderDetail);
}
