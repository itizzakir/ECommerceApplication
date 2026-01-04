package com.velora.velora_backend.controllers;

import com.velora.velora_backend.model.Payment;
import com.velora.velora_backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/payments")
public class PaymentController {

    @Autowired
    PaymentRepository paymentRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Payment> getAllPayments() {
        return paymentRepository.findAllByOrderByTransactionDateDesc();
    }
}
