package com.velora.velora_backend.controllers;

import com.velora.velora_backend.model.WishlistItem;
import com.velora.velora_backend.model.Product;
import com.velora.velora_backend.model.User;
import com.velora.velora_backend.repository.WishlistRepository;
import com.velora.velora_backend.repository.ProductRepository;
import com.velora.velora_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import lombok.NonNull;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    WishlistRepository wishlistRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    private User getAuthenticatedUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public List<WishlistItem> getWishlist() {
        User user = getAuthenticatedUser();
        return wishlistRepository.findByUser(user);
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<?> addToWishlist(@PathVariable @NonNull Long productId) {
        User user = getAuthenticatedUser();
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (wishlistRepository.existsByUserAndProduct(user, product)) {
            return ResponseEntity.badRequest().body("Product already in wishlist");
        }

        WishlistItem item = new WishlistItem(user, product);
        wishlistRepository.save(item);

        return ResponseEntity.ok("Item added to wishlist");
    }

    @DeleteMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<?> removeFromWishlist(@PathVariable Long id) {
        WishlistItem item = wishlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Wishlist item not found"));

        User user = getAuthenticatedUser();
        if (!java.util.Objects.equals(java.util.Objects.requireNonNull(item.getUser().getId()), java.util.Objects.requireNonNull(user.getId()))) {
             return ResponseEntity.status(403).body("Unauthorized");
        }

        wishlistRepository.delete(item);
        return ResponseEntity.ok("Item removed from wishlist");
    }
}
