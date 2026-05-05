package com.fooddel.web.controller;

import com.fooddel.web.dto.request.LoginRequest;
import com.fooddel.web.dto.request.RegisterRequest;
import com.fooddel.web.dto.response.ApiResponse;
import com.fooddel.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ApiResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request.getName(), request.getEmail(), request.getPassword());
    }

    @PostMapping("/login")
    public ApiResponse login(@RequestBody LoginRequest request) {
        return userService.login(request.getEmail(), request.getPassword());
    }
}
