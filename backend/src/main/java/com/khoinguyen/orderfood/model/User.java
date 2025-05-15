package com.khoinguyen.orderfood.model;

import com.khoinguyen.orderfood.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;

    private String password;
    private Boolean active=false;
    private String code;
    private String address;
    @Enumerated(EnumType.STRING)
    private Role role = Role.CUSTOMER;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
//    @PrePersist // Đảm bảo role không bị null trước khi lưu
//    public void prePersist() {
//        role = Role.CUSTOMER;
//        active=false;
//    }

}
