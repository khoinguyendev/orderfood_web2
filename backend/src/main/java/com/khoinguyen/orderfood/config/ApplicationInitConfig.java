package com.khoinguyen.orderfood.config;

import com.khoinguyen.orderfood.enums.Role;
import com.khoinguyen.orderfood.model.User;
import com.khoinguyen.orderfood.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ApplicationInitConfig {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository){
        return args -> {
            if(userRepository.findByEmail("admin@gmail.com").isEmpty()){
                User user= User.builder()
                        .email("admin@gmail.com")
                        .role(Role.ADMIN)
                        .active(true)
                        .password(passwordEncoder.encode("iuemxien"))
                        .build();
                userRepository.save(user);
            }
        };
    }
}
