package com.fooddel.web.dto.request;

import lombok.Data;

@Data
public class UpdateStatusRequest {
    private String orderId;
    private String status;
}
