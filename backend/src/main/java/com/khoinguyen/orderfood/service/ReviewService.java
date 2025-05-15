package com.khoinguyen.orderfood.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.khoinguyen.orderfood.dto.request.CreateReviewReq;
import com.khoinguyen.orderfood.dto.request.UpdateReviewReq;
import com.khoinguyen.orderfood.dto.response.ReviewResponse;
import com.khoinguyen.orderfood.exception.NotFound;
import com.khoinguyen.orderfood.mapper.ReviewMapper;
import com.khoinguyen.orderfood.model.Product;
import com.khoinguyen.orderfood.model.Review;
import com.khoinguyen.orderfood.model.User;
import com.khoinguyen.orderfood.repository.ReviewRepository;
import com.khoinguyen.orderfood.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final UserRepository userRepository;

    public ReviewResponse createReview(CreateReviewReq createReviewReq) {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByEmail(name).orElseThrow(() -> new NotFound("User not found"));
        Product product = new Product();
        product.setId(createReviewReq.getProductId());
        Review review = reviewMapper.toReview(createReviewReq);
        review.setProduct(product);
        review.setUser(user);
        review.setPublished(false);
        return reviewMapper.toReviewResponse(reviewRepository.save(review));
    }

    public Page<ReviewResponse> getAllReviews(Pageable pageable) {
        Page<Review> reviewPage = reviewRepository.findAll(pageable);
        List<ReviewResponse> responseList = reviewMapper.toReviewResponseList(reviewPage.getContent());
        return new PageImpl<>(responseList, pageable, reviewPage.getTotalElements());
    }
    public Page<ReviewResponse> getAllReviewsByProductId(Long id,Pageable pageable) {
        Page<Review> reviewPage = reviewRepository.findByProductIdAndPublished(id,true,pageable);
        List<ReviewResponse> responseList = reviewMapper.toReviewResponseList(reviewPage.getContent());
        return new PageImpl<>(responseList, pageable, reviewPage.getTotalElements());
    }

    public String deleteReviewById(Long id) {
        Review review = reviewRepository
                .findById(id)
                .orElseThrow(() -> new NotFound("Review not found"));
        reviewRepository.delete(review);
        return "Delete success";
    }

    public ReviewResponse updateReview(Long id,UpdateReviewReq updateReviewReq){
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NotFound("Review not found"));
        reviewMapper.setUpdateReviewReq(updateReviewReq,review);
        Review review2= reviewRepository.save(review);
        return reviewMapper.toReviewResponse(review2);
    }
}
