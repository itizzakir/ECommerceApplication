package com.velora.velora_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Double amount;

    private String paymentMethod;

    private String status; // Success, Failed, Pending

    private LocalDateTime transactionDate;
    
    // In a real app, this would be from Stripe/PayPal. We'll generate a UUID or use ID.
    private String transactionId; 

    public Payment(Order order, User user, Double amount, String paymentMethod, String status, String transactionId) {
        this.order = order;
        this.user = user;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.transactionId = transactionId;
        this.transactionDate = LocalDateTime.now();
    }
}
