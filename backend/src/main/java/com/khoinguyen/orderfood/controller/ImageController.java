package com.khoinguyen.orderfood.controller;

import com.khoinguyen.orderfood.dto.response.ApiResponse;
import com.khoinguyen.orderfood.model.Image;
import com.khoinguyen.orderfood.service.ImageService;
import com.khoinguyen.orderfood.utils.PageDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/images")
@AllArgsConstructor
public class ImageController {
    private final ImageService imageService;
    @GetMapping
    ApiResponse<PageDTO<Image>> getImages(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "20") int size,
                                          @RequestParam(defaultValue = "id,desc") String sort)
    {
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
        ApiResponse<PageDTO<Image>> apiResponse = new ApiResponse<>();
        apiResponse.setData(imageService.getImages(pageable));
        return apiResponse;
    }
}
