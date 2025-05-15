package com.khoinguyen.orderfood.controller;

import com.khoinguyen.orderfood.dto.request.ChangePasswordRequest;
import com.khoinguyen.orderfood.dto.request.CreateUserReq;
import com.khoinguyen.orderfood.dto.request.UpdateUserReq;
import com.khoinguyen.orderfood.dto.response.ApiResponse;
import com.khoinguyen.orderfood.dto.response.UserResponse;
import com.khoinguyen.orderfood.model.User;
import com.khoinguyen.orderfood.service.UserService;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    ApiResponse<User> createUser(@RequestBody CreateUserReq createUserReq){
        ApiResponse<User> apiResponse=new ApiResponse<>();
        apiResponse.setData(userService.createUser(createUserReq));
        return apiResponse;
    }
    @PostMapping("/create-by-admin")
    ApiResponse<User> createUserByAdmin(@RequestBody CreateUserReq createUserReq){
        ApiResponse<User> apiResponse=new ApiResponse<>();
        apiResponse.setData(userService.createUserByAdmin(createUserReq));
        return apiResponse;
    }
    @GetMapping("/my-info")
    ApiResponse<UserResponse> getMyInfo(){
        ApiResponse<UserResponse> apiResponse=new ApiResponse<>();
        apiResponse.setData(userService.getMyInfo());
        return apiResponse;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping()
    ApiResponse<Page<UserResponse>> getAllUsers(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "20") int size,
                                                    @RequestParam(defaultValue = "id,desc") String sort) {
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
        ApiResponse<Page<UserResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setData(userService.getAllUsers(pageable));
        return apiResponse;
    }
    @GetMapping("/active/{userId}")
    ApiResponse<String> activeAccount(@PathVariable String userId,@RequestParam String code){
        ApiResponse<String> apiResponse=new ApiResponse<>();
        apiResponse.setData(userService.activeAccount(userId,code));
        return apiResponse;
    }
    @PutMapping("/change-password")
    public ApiResponse<String> changePassword(@RequestBody ChangePasswordRequest request) {
        userService.changePassword(request);
        ApiResponse<String> apiResponse=new ApiResponse<>();
        apiResponse.setData("Password changed successfully");
        return apiResponse;
    }
    @PutMapping()
    ApiResponse<UserResponse> updateUser(@RequestBody UpdateUserReq updateUserReq){
        ApiResponse<UserResponse> apiResponse=new ApiResponse<>();
        apiResponse.setData(userService.updateUser(updateUserReq));
        return apiResponse;
    }

}
