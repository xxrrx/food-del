package com.fooddel.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "orders")
public class Order {
    @Id
    @JsonProperty("_id")
    private String id;
    private String userId;
    private List<Object> items;
    private Double amount;
    private Map<String, Object> address;
    private String status = "Food Processing";
    private Date date = new Date();
    private Boolean payment = false;
}
