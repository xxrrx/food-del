package com.fooddel.web.service;

import com.fooddel.web.dto.response.ApiResponse;
import com.fooddel.web.model.Order;
import com.fooddel.web.repository.OrderRepository;
import com.fooddel.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VNPayService vnPayService;

    private static final String FRONTEND_URL = "http://localhost:5173";

    public ApiResponse placeOrder(String userId, List<Object> items, double amount,
                                   Map<String, Object> address, String ipAddr) {
        try {
            Order order = new Order();
            order.setUserId(userId);
            order.setItems(items);
            order.setAmount(amount);
            order.setAddress(address);
            orderRepository.save(order);

            userRepository.findById(userId).ifPresent(user -> {
                user.getCartData().clear();
                userRepository.save(user);
            });

            String returnUrl = FRONTEND_URL + "/verify?orderId=" + order.getId();
            String paymentUrl = vnPayService.buildPaymentUrl(order.getId(), (long) amount, returnUrl, ipAddr);

            ApiResponse response = new ApiResponse();
            response.setSuccess(true);
            response.setSession_url(paymentUrl);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.fail("Error");
        }
    }

    public ApiResponse verifyOrder(String orderId, String success) {
        try {
            if ("00".equals(success)) {
                orderRepository.findById(orderId).ifPresent(order -> {
                    order.setPayment(true);
                    orderRepository.save(order);
                });
                return ApiResponse.ok("Paid");
            } else {
                orderRepository.deleteById(orderId);
                return ApiResponse.fail("Not Paid");
            }
        } catch (Exception e) {
            return ApiResponse.fail("Error");
        }
    }

    public ApiResponse userOrders(String userId) {
        return ApiResponse.ok(null, orderRepository.findByUserId(userId));
    }

    public ApiResponse listOrders() {
        return ApiResponse.ok(null, orderRepository.findAll());
    }

    public ApiResponse updateStatus(String orderId, String status) {
        orderRepository.findById(orderId).ifPresent(order -> {
            order.setStatus(status);
            orderRepository.save(order);
        });
        return ApiResponse.ok("Status Updated");
    }
}
