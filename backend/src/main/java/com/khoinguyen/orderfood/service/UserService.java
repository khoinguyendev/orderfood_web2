package com.khoinguyen.orderfood.service;

import com.khoinguyen.orderfood.dto.request.ChangePasswordRequest;
import com.khoinguyen.orderfood.dto.request.CreateUserReq;
import com.khoinguyen.orderfood.dto.request.UpdateUserReq;
import com.khoinguyen.orderfood.dto.response.UserResponse;
import com.khoinguyen.orderfood.enums.Role;
import com.khoinguyen.orderfood.exception.BadRequest;
import com.khoinguyen.orderfood.exception.Exists;
import com.khoinguyen.orderfood.exception.NotFound;
import com.khoinguyen.orderfood.mapper.UserMapper;
import com.khoinguyen.orderfood.model.User;
import com.khoinguyen.orderfood.repository.UserRepository;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final SendEmailService sendEmailService;
    private final PasswordEncoder passwordEncoder;

    public User createUser(CreateUserReq createUserReq) {
        if (userRepository.existsByEmail(createUserReq.getEmail())) {
            throw new Exists("Email already exists");
        }

        User user = userMapper.toUser(createUserReq);
        String code = generateOTP();
        user.setCode(code);
        user.setRole(Role.CUSTOMER);
        user.setActive(false);
        user.setPassword(passwordEncoder.encode(createUserReq.getPassword()));
        user = userRepository.save(user);
        try {
            sendEmailService.sendMailWithTemplate(createUserReq.getEmail(), createUserReq.getName(), code);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        return user;
    }

    public User createUserByAdmin(CreateUserReq createUserReq) {
        if (userRepository.existsByEmail(createUserReq.getEmail())) {
            throw new Exists("Email already exists");
        }
        User user = userMapper.toUser(createUserReq);
        user.setRole(createUserReq.getRole());
        user.setActive(true);
        user.setPassword(passwordEncoder.encode(createUserReq.getPassword()));
        user = userRepository.save(user);
        return user;
    }

    public String activeAccount(String userId, String code) {
        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new NotFound("User not found"));
        if (!user.getCode().equals(code)) {
            throw new NotFound("OTP invalid");
        }
        user.setActive(true);
        userRepository.save(user);
        return "Active account success";
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByEmail(name).orElseThrow(() -> new NotFound("User not found"));
        return userMapper.toUserResponse(user);
    }

    private String generateOTP() {
        SecureRandom secureRandom = new SecureRandom();
        int randomNumber = 100000 + secureRandom.nextInt(900000);
        return Integer.toString(randomNumber);
    }

    public Page<UserResponse> getAllUsers(Pageable pageable) {
        Page<User> userPage = userRepository.findAll(pageable);
        List<UserResponse> responseList = userMapper.toUserResponseList(userPage.getContent());
        return new PageImpl<>(responseList, pageable, userPage.getTotalElements());
    }

     public UserResponse updateUser(UpdateUserReq updateUserReq){
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByEmail(name).orElseThrow(() -> new NotFound("User not found"));
       
        userMapper.setUpdateUserReq(updateUserReq,user);
       
        return userMapper.toUserResponse(userRepository.save(user));
    }
    public void changePassword(ChangePasswordRequest request) {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFound("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequest("Current password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequest("Passwords do not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

}
