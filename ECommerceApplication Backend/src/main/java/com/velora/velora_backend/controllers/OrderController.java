package com.velora.velora_backend.controllers;

import com.velora.velora_backend.model.*;
import com.velora.velora_backend.repository.CartItemRepository;
import com.velora.velora_backend.repository.OrderRepository;
import com.velora.velora_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CartItemRepository cartItemRepository;
    
    @Autowired
    com.velora.velora_backend.repository.PaymentRepository paymentRepository;
    
    @Autowired
    com.velora.velora_backend.repository.ActivityLogRepository activityLogRepository;

    private User getAuthenticatedUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequest request) {
        User user = getAuthenticatedUser();
        List<CartItem> cartItems = cartItemRepository.findByUser(user);

        if (cartItems.isEmpty()) {
            return ResponseEntity.badRequest().body("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("Pending"); // Initial status
        order.setShippingAddress(request.getAddress());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setTrackingId(java.util.UUID.randomUUID().toString());

        double total = 0;
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem(
                cartItem.getProduct(),
                cartItem.getQuantity(),
                cartItem.getProduct().getPrice()
            );
            order.addOrderItem(orderItem);
            total += cartItem.getProduct().getPrice() * cartItem.getQuantity();
        }
        
        order.setTotalAmount(total);

        orderRepository.save(order);
        
        // Create Payment Record
        Payment payment = new Payment(
            order,
            user,
            total,
            request.getPaymentMethod(),
            "Success", // Assuming immediate success for now
            "TXN" + System.currentTimeMillis()
        );
        paymentRepository.save(payment);
        
        activityLogRepository.save(new com.velora.velora_backend.model.ActivityLog("New Order Placed", "Order #" + order.getId() + " by " + user.getEmail()));

        // Clear cart after order
        cartItemRepository.deleteAll(cartItems);

        return ResponseEntity.ok(java.util.Map.of("message", "Order placed successfully!", "trackingId", order.getTrackingId()));
    }

    @GetMapping("/track/{trackingId}")
    public ResponseEntity<?> trackOrder(@PathVariable String trackingId) {
        Order order = orderRepository.findByTrackingId(trackingId)
                .orElseThrow(() -> new RuntimeException("Order not found with tracking ID: " + trackingId));
        return ResponseEntity.ok(order);
    }

    @GetMapping("/my-orders")
    public List<Order> getMyOrders() {
        User user = getAuthenticatedUser();
        return orderRepository.findByUserOrderByOrderDateDesc(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        User user = getAuthenticatedUser();
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (!order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Access denied");
        }
        
        return ResponseEntity.ok(order);
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }

    @PutMapping("/admin/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @SuppressWarnings("null")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest request) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        order.setStatus(request.getStatus());
        orderRepository.save(order);
        
        activityLogRepository.save(new com.velora.velora_backend.model.ActivityLog("Order Status Updated", "Order #" + Objects.requireNonNull(order.getId()) + " to " + request.getStatus()));
        
        return ResponseEntity.ok("Order status updated");
    }

    // Helper DTOs
    public static class CreateOrderRequest {
        private String address;
        private String paymentMethod;
        
        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
        public String getPaymentMethod() { return paymentMethod; }
        public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    }

    public static class UpdateStatusRequest {
        private String status;
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
