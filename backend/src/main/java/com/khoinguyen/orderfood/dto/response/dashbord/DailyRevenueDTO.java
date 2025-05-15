package com.khoinguyen.orderfood.dto.response.dashbord;


import java.math.BigDecimal;

public interface DailyRevenueDTO {
    String getDate();         // dạng yyyy-MM-dd
    BigDecimal getTotal();    // tổng tiền của ngày đó
}