package com.fooddel.web.service;

import com.fooddel.web.dto.response.ApiResponse;
import com.fooddel.web.model.User;
import com.fooddel.web.repository.UserRepository;
import com.fooddel.web.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[^@]+@[^@]+\\.[^@]+$");

    public ApiResponse register(String name, String email, String password) {
        if (!EMAIL_PATTERN.matcher(email).matches())
            return ApiResponse.fail("Please enter a valid email");
        if (password.length() < 8)
            return ApiResponse.fail("Please enter a strong password");
        if (userRepository.findByEmail(email).isPresent())
            return ApiResponse.fail("User already exists");

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        ApiResponse response = ApiResponse.ok("Registered successfully");
        response.setToken(jwtUtil.generateToken(user.getId()));
        return response;
    }

    public ApiResponse login(String email, String password) {
        Optional<User> optUser = userRepository.findByEmail(email);
        if (optUser.isEmpty())
            return ApiResponse.fail("User doesn't exist");

        User user = optUser.get();
        if (!passwordEncoder.matches(password, user.getPassword()))
            return ApiResponse.fail("Invalid credentials");

        ApiResponse response = ApiResponse.ok("Login successful");
        response.setToken(jwtUtil.generateToken(user.getId()));
        return response;
    }
}
