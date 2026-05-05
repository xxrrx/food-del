package com.fooddel.web.controller;

import com.fooddel.web.dto.request.OrderRequest;
import com.fooddel.web.dto.request.UpdateStatusRequest;
import com.fooddel.web.dto.request.VerifyOrderRequest;
import com.fooddel.web.dto.response.ApiResponse;
import com.fooddel.web.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ApiResponse place(@RequestBody OrderRequest request, HttpServletRequest httpRequest) {
        String userId = (String) httpRequest.getAttribute("userId");
        return orderService.placeOrder(userId, request.getItems(), request.getAmount(), request.getAddress(), httpRequest.getRemoteAddr());
    }

    @PostMapping("/verify")
    public ApiResponse verify(@RequestBody VerifyOrderRequest request) {
        return orderService.verifyOrder(request.getOrderId(), request.getSuccess());
    }

    @PostMapping("/userorders")
    public ApiResponse userOrders(HttpServletRequest httpRequest) {
        String userId = (String) httpRequest.getAttribute("userId");
        return orderService.userOrders(userId);
    }

    @GetMapping("/list")
    public ApiResponse list() {
        return orderService.listOrders();
    }

    @PostMapping("/status")
    public ApiResponse updateStatus(@RequestBody UpdateStatusRequest request) {
        return orderService.updateStatus(request.getOrderId(), request.getStatus());
    }
}
