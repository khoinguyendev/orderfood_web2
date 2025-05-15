package com.khoinguyen.orderfood.service;

import com.khoinguyen.orderfood.dto.response.OrderResponse;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendOrderNotification(OrderResponse order) {
        messagingTemplate.convertAndSend("/admin/order", order);
    }
    public void sendOrderNotificationClient(OrderResponse order) {
        messagingTemplate.convertAndSend("/client/order", order);
    }
}

