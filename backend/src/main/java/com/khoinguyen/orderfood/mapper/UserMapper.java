package com.khoinguyen.orderfood.mapper;
import com.khoinguyen.orderfood.dto.request.CreateUserReq;
import com.khoinguyen.orderfood.dto.request.UpdateUserReq;
import com.khoinguyen.orderfood.dto.response.UserResponse;
import com.khoinguyen.orderfood.model.User;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(CreateUserReq userReq);
    UserResponse toUserResponse(User user);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void setUpdateUserReq(UpdateUserReq updateUserReq, @MappingTarget User user);

    List<UserResponse> toUserResponseList(List<User> users); // <- Thêm dòng này

}
