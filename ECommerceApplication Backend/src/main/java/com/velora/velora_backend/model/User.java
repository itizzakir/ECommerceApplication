package com.velora.velora_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users", 
       uniqueConstraints = { 
           @UniqueConstraint(columnNames = "email") 
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  @com.fasterxml.jackson.annotation.JsonIgnore
  private String password;

  private String role;

  private String status = "Active";
  
  private String fullName;
  
  private String phoneNumber;
  
  private String address;

  public User(String email, String password, String role) {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
