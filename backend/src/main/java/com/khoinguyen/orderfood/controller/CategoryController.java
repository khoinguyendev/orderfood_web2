package com.khoinguyen.orderfood.controller;

import com.khoinguyen.orderfood.dto.request.CreateCategoryReq;
import com.khoinguyen.orderfood.dto.request.UpdateCategoryReq;
import com.khoinguyen.orderfood.dto.response.ApiResponse;
import com.khoinguyen.orderfood.model.Category;
import com.khoinguyen.orderfood.service.CategoryService;
import com.khoinguyen.orderfood.utils.PageDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/categories")
@AllArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    ApiResponse<Category> createCategory(@RequestParam("file") MultipartFile file, @RequestPart("category") CreateCategoryReq categoryReq) {
        ApiResponse<Category> apiResponse = new ApiResponse<>();
        apiResponse.setData(categoryService.createCategory(categoryReq, file));
        return apiResponse;

    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/new")
    ApiResponse<Category> createCategoryNew(@RequestBody CreateCategoryReq categoryReq) {
        ApiResponse<Category> apiResponse = new ApiResponse<>();
        apiResponse.setData(categoryService.createCategoryNew(categoryReq));
        return apiResponse;

    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{categoryId}")
    ApiResponse<Category> updateCategory(@PathVariable Long categoryId, @RequestParam(value = "file", required = false) MultipartFile file, @RequestPart("category") UpdateCategoryReq categoryRes) {
        ApiResponse<Category> apiResponse = new ApiResponse<>();
        apiResponse.setData(categoryService.updateCategory(categoryId, categoryRes, file));
        return apiResponse;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/new/{categoryId}")
    ApiResponse<Category> updateCategoryNew(@PathVariable Long categoryId, @RequestBody UpdateCategoryReq categoryRes) {
        ApiResponse<Category> apiResponse = new ApiResponse<>();
        apiResponse.setData(categoryService.updateCategoryNew(categoryId, categoryRes));
        return apiResponse;
    }
    @GetMapping
    ApiResponse<PageDTO<Category>> getCategories(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "20") int size,
                                                 @RequestParam(defaultValue = "id,desc") String sort) {
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
        ApiResponse<PageDTO<Category>> apiResponse = new ApiResponse<>();
        apiResponse.setData(categoryService.getCategories(pageable));
        return apiResponse;
    }
//    @GetMapping
//    ApiResponse<Page<Category>> getCategories(Pageable pageable)
//    {
//        ApiResponse<Page<Category>> apiResponse = new ApiResponse<>();
//        apiResponse.setData(categoryService.getCategories(pageable));
//        return apiResponse;
//    }
    @GetMapping("/{categoryId}")
    ApiResponse<Category> createCategory(@PathVariable Long categoryId) {
        ApiResponse<Category> apiResponse = new ApiResponse<>();
        apiResponse.setData(categoryService.getCategoryById(categoryId));
        return apiResponse;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/import-excel")
    ApiResponse<List<Category>> importExcel(@RequestBody List<CreateCategoryReq> categoryReqList){
        ApiResponse<List<Category>> apiResponse = new ApiResponse<>();
        apiResponse.setData(categoryService.importExcel(categoryReqList));
        return apiResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{categoryId}")
    ApiResponse<String> deleteCategoryById(@PathVariable Long categoryId){
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setData(categoryService.deleteCategoryById(categoryId));
        return apiResponse;
    }
}

