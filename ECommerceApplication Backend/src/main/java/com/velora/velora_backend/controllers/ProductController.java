package com.velora.velora_backend.controllers;

import com.velora.velora_backend.model.Product;
import com.velora.velora_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import lombok.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;


    
    @Autowired
    private com.velora.velora_backend.repository.ActivityLogRepository activityLogRepository;

    @GetMapping("/products")
    public List<Product> getAllProducts(@RequestParam(required = false) String name) {
        if (name != null && !name.isEmpty()) {
            return productRepository.findByTitleContainingIgnoreCase(name);
        }
        return productRepository.findAll();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable @NonNull Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/admin/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        if (product == null) {
            return ResponseEntity.badRequest().build();
        }
        productRepository.save(product);
        
        activityLogRepository.save(new com.velora.velora_backend.model.ActivityLog("Product Added", product.getTitle()));
        
        return ResponseEntity.ok(product);
    }

    @PutMapping("/admin/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SuppressWarnings("null")
    public ResponseEntity<Product> updateProduct(@PathVariable @NonNull Long id, @RequestBody Product productDetails) {
        Optional<Product> productData = productRepository.findById(id);

        if (productData.isPresent()) {
            Product product = productData.get();
            product.setTitle(productDetails.getTitle());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setDiscount(productDetails.getDiscount());
            product.setStock(productDetails.getStock());
            if (productDetails.getCategory() != null) {
                product.setCategory(productDetails.getCategory());
            }
            if (productDetails.getBrand() != null) {
                product.setBrand(productDetails.getBrand());
            }
            product.setImg(productDetails.getImg());
            if (productDetails.getRating() != null) {
                product.setRating(productDetails.getRating());
            }
            if (productDetails.getRatingCount() != null) {
                product.setRatingCount(java.util.Objects.requireNonNull(productDetails.getRatingCount()));
            }
            return ResponseEntity.ok(productRepository.save(product));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/admin/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
