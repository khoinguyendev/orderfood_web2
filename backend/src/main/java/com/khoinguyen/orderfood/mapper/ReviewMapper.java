package com.khoinguyen.orderfood.mapper;

import com.khoinguyen.orderfood.dto.request.CreateReviewReq;
import com.khoinguyen.orderfood.dto.request.UpdateReviewReq;
import com.khoinguyen.orderfood.dto.response.ReviewResponse;
import com.khoinguyen.orderfood.model.Review;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    ReviewResponse toReviewResponse(Review review);

    Review toReview(CreateReviewReq createReviewReq);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void setUpdateReviewReq(UpdateReviewReq updateReviewReq, @MappingTarget Review review);

    List<ReviewResponse> toReviewResponseList(List<Review> reviews); // <- Thêm dòng này

}
