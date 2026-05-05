package com.fooddel.web.controller;

import com.fooddel.web.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping("/list")
    public Map<String, Object> list() {
        return foodService.listFood();
    }

    @PostMapping("/add")
    public Map<String, Object> add(@RequestParam String name,
                                   @RequestParam String description,
                                   @RequestParam double price,
                                   @RequestParam String category,
                                   @RequestParam MultipartFile image) {
        return foodService.addFood(name, description, price, category, image);
    }

    @PostMapping("/remove")
    public Map<String, Object> remove(@RequestBody Map<String, String> body) {
        return foodService.removeFood(body.get("id"));
    }

    @PostMapping("/update")
    public Map<String, Object> update(@RequestParam String id,
                                      @RequestParam String name,
                                      @RequestParam String description,
                                      @RequestParam double price,
                                      @RequestParam String category,
                                      @RequestParam(required = false) MultipartFile image) {
        return foodService.updateFood(id, name, description, price, category, image);
    }
}
