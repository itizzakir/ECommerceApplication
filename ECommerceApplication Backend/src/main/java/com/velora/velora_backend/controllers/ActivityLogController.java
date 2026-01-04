package com.velora.velora_backend.controllers;

import com.velora.velora_backend.model.ActivityLog;
import com.velora.velora_backend.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/activity-logs")
public class ActivityLogController {

    @Autowired
    ActivityLogRepository activityLogRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ActivityLog> getRecentActivities() {
        // Return top 20 recent activities
        return activityLogRepository.findAllByOrderByTimestampDesc()
                .stream()
                .limit(20)
                .collect(Collectors.toList());
    }
}
