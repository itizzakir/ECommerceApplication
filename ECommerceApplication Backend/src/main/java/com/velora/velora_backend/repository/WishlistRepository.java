package com.velora.velora_backend.repository;

import com.velora.velora_backend.model.WishlistItem;
import com.velora.velora_backend.model.User;
import com.velora.velora_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByUser(User user);
    Optional<WishlistItem> findByUserAndProduct(User user, Product product);
    boolean existsByUserAndProduct(User user, Product product);
}
