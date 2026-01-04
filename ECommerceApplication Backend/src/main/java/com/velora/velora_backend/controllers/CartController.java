package com.velora.velora_backend.controllers;

import com.velora.velora_backend.model.CartItem;
import com.velora.velora_backend.model.Product;
import com.velora.velora_backend.model.User;
import com.velora.velora_backend.repository.CartItemRepository;
import com.velora.velora_backend.repository.ProductRepository;
import com.velora.velora_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    CartItemRepository cartItemRepository;

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
    public List<CartItem> getCart() {
        User user = getAuthenticatedUser();
        return cartItemRepository.findByUser(user);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartRequest request) {
        User user = getAuthenticatedUser();
        Long productId = request.getProductId();
        if (productId == null) {
            return ResponseEntity.badRequest().body("Product ID cannot be null");
        }
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cartItemRepository.findByUserAndProduct(user, product)
                .orElse(new CartItem(user, product, 0));

        cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
        cartItemRepository.save(cartItem);

        return ResponseEntity.ok("Item added to cart");
    }

    @PutMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<?> updateCartItem(@PathVariable Long id, @RequestBody UpdateCartRequest request) {
        User user = getAuthenticatedUser();
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        if (!java.util.Objects.equals(java.util.Objects.requireNonNull(cartItem.getUser().getId()), java.util.Objects.requireNonNull(user.getId()))) {
            return ResponseEntity.status(403).body("Unauthorized");
        }
        cartItemRepository.save(cartItem);
        return ResponseEntity.ok("Cart updated");
    }

    @DeleteMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<?> removeFromCart(@PathVariable Long id) {
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        User user = getAuthenticatedUser();
        if (!java.util.Objects.equals(java.util.Objects.requireNonNull(cartItem.getUser().getId()), java.util.Objects.requireNonNull(user.getId()))) {
             return ResponseEntity.status(403).body("Unauthorized");
        }

        cartItemRepository.delete(cartItem);
        return ResponseEntity.ok("Item removed from cart");
    }

    // Helper classes for requests
    public static class AddToCartRequest {
        private Long productId;
        private int quantity;
        
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }

    public static class UpdateCartRequest {
        private int quantity;
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }
}
