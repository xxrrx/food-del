package com.fooddel.web.controller;

import com.fooddel.web.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class TestController {

    @Autowired
    private FoodRepository foodRepository;

    @GetMapping("/")
    public Map<String, Object> test() {
        long count = foodRepository.count();
        return Map.of("success", true, "message", "DB connected", "foodCount", count);
    }
}
