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
                List<Product> products = new java.util.ArrayList<>();
                try (InputStream inputStream = new ClassPathResource("products.json").getInputStream()) {
                    List<Product> loadedProducts = mapper.readValue(inputStream, new TypeReference<List<Product>>() {});
                    if (loadedProducts != null) {
                        products.addAll(loadedProducts);
                    }
                }
                
                // Reset IDs to allow database to generate them
                for (Product product : products) {
                    product.setId(null);
                }

                if (!products.isEmpty()) {
                    productRepository.saveAll(products);
                } else {
                    System.out.println("No products loaded from products.json.");
                }
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
        
        // Update specific product image
        productRepository.findById(41L).ifPresent(product -> {
            product.setImg("https://media.istockphoto.com/id/615271872/photo/silver-chain-on-white-background.jpg?s=612x612&w=0&k=20&c=KmdfT3jcwBmzNXbgyvckWYQqpABTdeikwhhPxHWFiEg=");
            productRepository.save(product);
            System.out.println("Updated image for product 41");
        });

        // Update product 9 image
        productRepository.findById(9L).ifPresent(product -> {
            product.setImg("https://media.istockphoto.com/id/500160116/photo/traditional-and-ethnic-indian-blouse-for-women-to-be-worn.jpg?s=612x612&w=0&k=20&c=b94p676XW-n6sH4-dBXMGNG-12nL1K0Ff-2VRezE6sE=");
            productRepository.save(product);
            System.out.println("Updated image for product 9");
        });
    }
}
