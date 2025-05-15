package com.khoinguyen.orderfood.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProductReq {
    private String name;
    private String description;
    private BigDecimal price;
    private Long categoryId;
    private boolean available;
    private List<String> image;
}