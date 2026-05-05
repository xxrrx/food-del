package com.fooddel.web.service;

import com.fooddel.web.model.Food;
import com.fooddel.web.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Value("${upload.dir}")
    private String uploadDir;

    private String saveFile(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath();
        Files.createDirectories(uploadPath);
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        try (InputStream in = file.getInputStream()) {
            Files.copy(in, uploadPath.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
        }
        return filename;
    }

    private void deleteFile(String filename) {
        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath();
            Files.deleteIfExists(uploadPath.resolve(filename));
        } catch (IOException ignored) {}
    }

    public Map<String, Object> addFood(String name, String description, double price, String category, MultipartFile image) {
        try {
            String filename = saveFile(image);
            Food food = new Food();
            food.setName(name);
            food.setDescription(description);
            food.setPrice(price);
            food.setCategory(category);
            food.setImage(filename);
            foodRepository.save(food);
            return Map.of("success", true, "message", "Food Added");
        } catch (IOException e) {
            e.printStackTrace();
            return Map.of("success", false, "message", "Error");
        }
    }

    public Map<String, Object> listFood() {
        List<Food> foods = foodRepository.findAll();
        return Map.of("success", true, "data", foods);
    }

    public Map<String, Object> removeFood(String id) {
        Optional<Food> opt = foodRepository.findById(id);
        if (opt.isPresent()) {
            deleteFile(opt.get().getImage());
            foodRepository.deleteById(id);
        }
        return Map.of("success", true, "message", "Food Removed");
    }

    public Map<String, Object> updateFood(String id, String name, String description, double price, String category, MultipartFile image) {
        Optional<Food> opt = foodRepository.findById(id);
        if (opt.isEmpty()) {
            return Map.of("success", false, "message", "Food not found");
        }

        Food food = opt.get();
        food.setName(name);
        food.setDescription(description);
        food.setPrice(price);
        food.setCategory(category);

        if (image != null && !image.isEmpty()) {
            try {
                deleteFile(food.getImage());
                food.setImage(saveFile(image));
            } catch (IOException e) {
                e.printStackTrace();
                return Map.of("success", false, "message", "Error");
            }
        }

        foodRepository.save(food);
        return Map.of("success", true, "message", "Food Updated");
    }
}
