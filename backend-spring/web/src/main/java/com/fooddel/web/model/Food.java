package com.fooddel.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "foods")
public class Food {
    @Id
    @JsonProperty("_id")
    private String id;
    private String name;
    private String description;
    private Double price;
    private String image;
    private String category;
}
