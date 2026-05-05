package com.fooddel.web.service;

import com.fooddel.web.model.Food;
import com.fooddel.web.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private S3Client s3Client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Value("${aws.s3.region}")
    private String region;

    private String saveFile(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String key = "uploads/" + filename;
        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .contentType(file.getContentType())
                        .build(),
                RequestBody.fromInputStream(file.getInputStream(), file.getSize())
        );
        return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + key;
    }

    private void deleteFile(String imageUrl) {
        try {
            // Extract S3 key from full URL
            String key = imageUrl.substring(imageUrl.indexOf("uploads/"));
            s3Client.deleteObject(DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build());
        } catch (Exception ignored) {}
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
