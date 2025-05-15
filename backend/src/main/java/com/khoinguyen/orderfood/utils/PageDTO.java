package com.khoinguyen.orderfood.utils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageDTO<T> {
    private List<T> content;
    private int number; // Số trang hiện tại
    private int size; // Số phần tử trong mỗi trang
    private long totalElements; // Tổng số phần tử
    private int totalPages; // Tổng số trang
}


