package com.khoinguyen.orderfood.dto.response.dashbord;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStats {
    private long totalProducts;
    private long totalCategories;
    private long totalOrders;
    private long totalUsers;
}
