package com.fooddel.web.dto.request;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class OrderRequest {
    private List<Object> items;
    private Double amount;
    private Map<String, Object> address;
}
