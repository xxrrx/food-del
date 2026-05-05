package com.fooddel.web.config;

import com.fooddel.web.model.Food;
import com.fooddel.web.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public void run(String... args) {
        if (foodRepository.count() > 0) return;

        List<Food> foods = List.of(
            food("Margherita Pizza", "Pizza phô mai mozzarella với sốt cà chua tươi", 85000, "Pizza", "food_1.png"),
            food("Pepperoni Pizza", "Pizza xúc xích pepperoni béo ngậy thơm ngon", 95000, "Pizza", "food_2.png"),
            food("Beef Burger", "Burger bò nướng với rau tươi và sốt đặc biệt", 75000, "Burgers", "food_3.png"),
            food("Chicken Burger", "Burger gà giòn với phô mai và rau xà lách", 65000, "Burgers", "food_4.png"),
            food("Caesar Salad", "Salad rau romaine với sốt caesar và crouton", 55000, "Salads", "food_5.png"),
            food("Greek Salad", "Salad Hy Lạp với phô mai feta và olive tươi", 60000, "Salads", "food_6.png"),
            food("Spaghetti Bolognese", "Mì spaghetti với sốt thịt bò bằm đậm đà", 90000, "Pasta", "food_7.png"),
            food("Fettuccine Alfredo", "Mì fettuccine với sốt kem phô mai béo ngậy", 85000, "Pasta", "food_8.png"),
            food("Chocolate Cake", "Bánh socola mềm với lớp kem tươi bên trên", 45000, "Cake", "food_9.png"),
            food("Tiramisu", "Bánh tiramisu Ý truyền thống với cà phê espresso", 50000, "Cake", "food_10.png")
        );

        foodRepository.saveAll(foods);
        System.out.println("Seeded 10 food items successfully!");
    }

    private Food food(String name, String description, double price, String category, String image) {
        Food f = new Food();
        f.setName(name);
        f.setDescription(description);
        f.setPrice(price);
        f.setCategory(category);
        f.setImage(image);
        return f;
    }
}
