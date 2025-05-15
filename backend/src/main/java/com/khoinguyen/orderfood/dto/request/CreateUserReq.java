package com.khoinguyen.orderfood.dto.request;

import com.khoinguyen.orderfood.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserReq {
    private String name;

    private String email;
    private Role role;
    private String phone;
    private String address;
    private String password;
}
