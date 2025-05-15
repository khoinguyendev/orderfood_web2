package com.khoinguyen.orderfood.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.khoinguyen.orderfood.dto.request.CreateReviewReq;
import com.khoinguyen.orderfood.dto.request.UpdateReviewReq;
import com.khoinguyen.orderfood.dto.response.ApiResponse;
import com.khoinguyen.orderfood.dto.response.ReviewResponse;
import com.khoinguyen.orderfood.service.ReviewService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/reviews")
@AllArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    ApiResponse<ReviewResponse> createProduct(@RequestBody CreateReviewReq createReviewReq) {
        ApiResponse<ReviewResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(reviewService.createReview(createReviewReq));
        return apiResponse;
    }
    @GetMapping("/reviews-by-product/{productId}")
    ApiResponse<Page<ReviewResponse>> getAllReviewsByProduct(@PathVariable Long productId,@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id,desc") String sort) {
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
        ApiResponse<Page<ReviewResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setData(reviewService.getAllReviewsByProductId(productId,pageable));
        return apiResponse;
    }
    @GetMapping()
    ApiResponse<Page<ReviewResponse>> getAllReviews(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id,desc") String sort) {
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
        ApiResponse<Page<ReviewResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setData(reviewService.getAllReviews(pageable));
        return apiResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{reviewId}")
    ApiResponse<String> deleteProductById(@PathVariable Long reviewId) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setData(reviewService.deleteReviewById(reviewId));
        return apiResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{reviewId}")
    ApiResponse<ReviewResponse> updateReview(@PathVariable Long reviewId, @RequestBody UpdateReviewReq updateReviewReq) {
        ApiResponse<ReviewResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(reviewService.updateReview(reviewId, updateReviewReq));
        return apiResponse;
    }
}
