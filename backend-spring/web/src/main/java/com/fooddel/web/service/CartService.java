package com.fooddel.web.service;

import com.fooddel.web.dto.response.ApiResponse;
import com.fooddel.web.model.User;
import com.fooddel.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private UserRepository userRepository;

    public ApiResponse addToCart(String userId, String itemId) {
        Optional<User> opt = userRepository.findById(userId);
        if (opt.isEmpty()) return ApiResponse.fail("User not found");
        User user = opt.get();
        user.getCartData().merge(itemId, 1, Integer::sum);
        userRepository.save(user);
        return ApiResponse.ok("Added To Cart");
    }

    public ApiResponse removeFromCart(String userId, String itemId) {
        Optional<User> opt = userRepository.findById(userId);
        if (opt.isEmpty()) return ApiResponse.fail("User not found");
        User user = opt.get();
        if (user.getCartData().getOrDefault(itemId, 0) > 0)
            user.getCartData().put(itemId, user.getCartData().get(itemId) - 1);
        userRepository.save(user);
        return ApiResponse.ok("Removed From Cart");
    }

    public ApiResponse removeAll(String userId, String itemId) {
        Optional<User> opt = userRepository.findById(userId);
        if (opt.isEmpty()) return ApiResponse.fail("User not found");
        User user = opt.get();
        user.getCartData().put(itemId, 0);
        userRepository.save(user);
        return ApiResponse.ok("Removed All");
    }

    public ApiResponse getCart(String userId) {
        Optional<User> opt = userRepository.findById(userId);
        if (opt.isEmpty()) return ApiResponse.fail("User not found");
        ApiResponse response = new ApiResponse();
        response.setSuccess(true);
        response.setCartData(opt.get().getCartData());
        return response;
    }
}
