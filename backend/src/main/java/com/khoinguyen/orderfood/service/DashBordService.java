package com.khoinguyen.orderfood.service;

import com.khoinguyen.orderfood.dto.response.dashbord.DailyRevenueDTO;
import com.khoinguyen.orderfood.dto.response.dashbord.DashboardStats;
import com.khoinguyen.orderfood.repository.CategoryRepository;
import com.khoinguyen.orderfood.repository.OrderRepository;
import com.khoinguyen.orderfood.repository.ProductRepository;
import com.khoinguyen.orderfood.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashBordService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    public List<DailyRevenueDTO> getRevenueByMonthAndYear(int month,int year) {
        return orderRepository.getDailyRevenueByMonth(month, year);
    }
    public DashboardStats getDashboardStats() {
        long productCount = productRepository.count();
        long categoryCount = categoryRepository.count();
        long orderCount = orderRepository.count();
        long userCount = userRepository.count();
        return new DashboardStats(productCount, categoryCount, orderCount,userCount);
    }
}
