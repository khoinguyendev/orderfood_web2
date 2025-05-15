package com.khoinguyen.orderfood.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateReviewReq {
    private String comment;
    private int rating;
    private boolean published;
}
