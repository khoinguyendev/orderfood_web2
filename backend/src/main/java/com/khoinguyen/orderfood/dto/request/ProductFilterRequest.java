package com.khoinguyen.orderfood.dto.request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductFilterRequest {
    private List<Long> categoryIds;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}
