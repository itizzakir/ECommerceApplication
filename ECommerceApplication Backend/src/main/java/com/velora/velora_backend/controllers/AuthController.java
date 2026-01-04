package com.velora.velora_backend.controllers;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.velora.velora_backend.model.User;
import com.velora.velora_backend.payload.request.LoginRequest;
import com.velora.velora_backend.payload.request.SignupRequest;
import com.velora.velora_backend.payload.response.JwtResponse;
import com.velora.velora_backend.payload.response.MessageResponse;
import com.velora.velora_backend.repository.UserRepository;
import com.velora.velora_backend.security.jwt.JwtUtils;
import com.velora.velora_backend.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken((UserDetailsImpl) authentication.getPrincipal());
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
    String role = userDetails.getAuthorities().stream()
        .findFirst()
        .map(item -> item.getAuthority())
        .orElse("Customer");
        
    // Normalize role for frontend (which expects "Admin" or "Customer")
    if (role.equalsIgnoreCase("ROLE_ADMIN") || role.equalsIgnoreCase("ADMIN")) {
        role = "Admin";
    } else if (role.equalsIgnoreCase("ROLE_CUSTOMER") || role.equalsIgnoreCase("CUSTOMER")) {
        role = "Customer";
    }

    return ResponseEntity.ok(new JwtResponse(jwt, 
                         userDetails.getId(), 
                         userDetails.getUsername(), 
                         role));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    String role = "ROLE_CUSTOMER";
    if (signUpRequest.getRole() != null) {
        if (signUpRequest.getRole().equalsIgnoreCase("admin")) {
            role = "ROLE_ADMIN";
        } else {
            role = "ROLE_CUSTOMER";
        }
    }

    // Create new user's account
    User user = new User(signUpRequest.getEmail(),
               encoder.encode(signUpRequest.getPassword()),
               role);

    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
}
