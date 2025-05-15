package com.khoinguyen.orderfood.mapper;


import com.khoinguyen.orderfood.dto.request.CreateProductReq;

import com.khoinguyen.orderfood.dto.request.UpdateProductReq;

import com.khoinguyen.orderfood.dto.response.ProductResponse;
import com.khoinguyen.orderfood.model.Product;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "image", ignore = true) // Bỏ qua field image
    Product toProduct(CreateProductReq productReq);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "image", ignore = true)
    void setUpdateProductRes(UpdateProductReq updateProductReq, @MappingTarget Product product);
    ProductResponse toProductResponse(Product product);
}
