package com.fooddel.web.dto.request;

import lombok.Data;

@Data
public class VerifyOrderRequest {
    private String orderId;
    private String success;
}
