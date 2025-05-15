package com.khoinguyen.orderfood.dto.request;

import com.khoinguyen.orderfood.enums.Status;
import lombok.Data;

@Data
public class UpdateOrderReq {
    private Status status;

}
