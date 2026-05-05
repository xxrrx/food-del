package com.fooddel.web.controller;

import com.fooddel.web.dto.request.CartRequest;
import com.fooddel.web.dto.response.ApiResponse;
import com.fooddel.web.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ApiResponse add(@RequestBody CartRequest request, HttpServletRequest httpRequest) {
        String userId = (String) httpRequest.getAttribute("userId");
        return cartService.addToCart(userId, request.getItemId());
    }

    @PostMapping("/remove")
    public ApiResponse remove(@RequestBody CartRequest request, HttpServletRequest httpRequest) {
        String userId = (String) httpRequest.getAttribute("userId");
        return cartService.removeFromCart(userId, request.getItemId());
    }

    @PostMapping("/removeAll")
    public ApiResponse removeAll(@RequestBody CartRequest request, HttpServletRequest httpRequest) {
        String userId = (String) httpRequest.getAttribute("userId");
        return cartService.removeAll(userId, request.getItemId());
    }

    @GetMapping("/get")
    public ApiResponse get(HttpServletRequest httpRequest) {
        String userId = (String) httpRequest.getAttribute("userId");
        return cartService.getCart(userId);
    }
}
