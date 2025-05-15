package com.khoinguyen.orderfood.controller;

import com.khoinguyen.orderfood.dto.response.ApiResponse;
import com.khoinguyen.orderfood.dto.response.dashbord.DailyRevenueDTO;
import com.khoinguyen.orderfood.dto.response.dashbord.DashboardStats;
import com.khoinguyen.orderfood.service.DashBordService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dash-board")
@AllArgsConstructor
public class DashbordController {
    private final DashBordService dashBordService;
    @GetMapping("/daily-revenue")
    public ApiResponse<List<DailyRevenueDTO>> getRevenueByMonth(
            @RequestParam int month,
            @RequestParam int year) {
        ApiResponse<List<DailyRevenueDTO>> apiResponse = new ApiResponse<>();
        apiResponse.setData(dashBordService.getRevenueByMonthAndYear(month, year));
        return apiResponse;
    }
    @GetMapping("/stats")
    public ApiResponse<DashboardStats> getStats() {
        ApiResponse<DashboardStats> apiResponse = new ApiResponse<>();
        apiResponse.setData(dashBordService.getDashboardStats());

        return apiResponse;
    }
}
