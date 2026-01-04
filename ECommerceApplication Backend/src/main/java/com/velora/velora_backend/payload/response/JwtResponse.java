package com.velora.velora_backend.payload.response;

import lombok.Data;

@Data
public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String email;
  private String role;
  private String fullName;
  private String phoneNumber;
  private String address;

  public JwtResponse(String accessToken, Long id, String email, String role, String fullName, String phoneNumber, String address) {
    this.token = accessToken;
    this.id = id;
    this.email = email;
    this.role = role;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }
}
