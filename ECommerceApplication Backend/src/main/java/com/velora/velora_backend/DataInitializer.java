package com.velora.velora_backend;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.velora.velora_backend.model.Category;
import com.velora.velora_backend.model.Product;
import com.velora.velora_backend.repository.CategoryRepository;
import com.velora.velora_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                InputStream inputStream = new ClassPathResource("products.json").getInputStream();
                List<Product> products = mapper.readValue(inputStream, new TypeReference<List<Product>>(){});
                
                // Reset IDs to allow database to generate them
                for (Product product : products) {
                    product.setId(null);
                }

                productRepository.saveAll(products);
                System.out.println("Products seeded successfully!");

                // Seed Categories
                Set<String> uniqueCategories = new HashSet<>();
                for (Product product : products) {
                    if (product.getCategory() != null && !product.getCategory().isEmpty()) {
                        uniqueCategories.add(product.getCategory());
                    }
                }

                for (String categoryName : uniqueCategories) {
                    if (categoryRepository.findByName(categoryName).isEmpty()) {
                        categoryRepository.save(new Category(categoryName, ""));
                    }
                }
                System.out.println("Categories seeded successfully!");

            } catch (Exception e) {
                System.out.println("Unable to seed data: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
}
