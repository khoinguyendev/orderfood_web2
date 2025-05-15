package com.khoinguyen.orderfood.controller;

import com.khoinguyen.orderfood.dto.request.CreateProductExcelReq;
import com.khoinguyen.orderfood.dto.request.CreateProductReq;
import com.khoinguyen.orderfood.dto.request.ProductFilterRequest;
import com.khoinguyen.orderfood.dto.request.UpdateProductReq;
import com.khoinguyen.orderfood.dto.response.ApiResponse;
import com.khoinguyen.orderfood.model.Product;
import com.khoinguyen.orderfood.service.ProductService;
import com.khoinguyen.orderfood.utils.PageDTO;
import com.khoinguyen.orderfood.utils.ProductSpecification;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    ApiResponse<Product> createProduct(@RequestParam("file") MultipartFile file,
            @RequestPart("product") CreateProductReq productReq) {
        ApiResponse<Product> apiResponse = new ApiResponse<>();
        apiResponse.setData(productService.createProduct(productReq, file));
        return apiResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/new")
    ApiResponse<Product> createProduct(@RequestBody CreateProductReq productReq) {
        ApiResponse<Product> apiResponse = new ApiResponse<>();
        apiResponse.setData(productService.createProductNew(productReq));
        return apiResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{productId}")
    ApiResponse<Product> updateProduct(@PathVariable Long productId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestPart("product") UpdateProductReq productReq) {
        ApiResponse<Product> apiResponse = new ApiResponse<>();
        apiResponse.setData(productService.updateProduct(productId, productReq, file));
        return apiResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/new/{productId}")
    ApiResponse<Product> updateProductNew(@PathVariable Long productId, @RequestBody UpdateProductReq productReq) {
        ApiResponse<Product> apiResponse = new ApiResponse<>();
        apiResponse.setData(productService.updateProductNew(productId, productReq));
        return apiResponse;
    }

    @GetMapping
    ApiResponse<PageDTO<Product>> getProducts(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) Boolean available,

            @RequestParam(defaultValue = "id,desc") String sort) {
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
        ApiResponse<PageDTO<Product>> apiResponse = new ApiResponse<>();
        apiResponse.setData(productService.getProducts(pageable, available));
        return apiResponse;
    }

    @GetMapping("/search")
    ApiResponse<Page<Product>> searchProducts(@RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "id,desc") String sort,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) Boolean available,
            @RequestParam String keyword) {

        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
        ApiResponse<Page<Product>> apiResponse = new ApiResponse<>();
        apiResponse.setData(productService.searchProducts(keyword, pageable));
        return apiResponse;
    }

    @GetMapping("/{productId}")
    ApiResponse<Product> getProductById(@PathVariable Long productId) {
        ApiResponse<Product> apiResponse = new ApiResponse<>();
        apiResponse.setData(productService.getProductById(productId));
        return apiResponse;
    }

    @PostMapping("/filter")
    public ApiResponse<Page<Product>> filterProducts(@RequestBody ProductFilterRequest filterRequest,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id,desc") String sort) {
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
        Specification<Product> spec = ProductSpecification.filterByCategoriesAndPrice(
                filterRequest.getCategoryIds(),
                filterRequest.getMinPrice(),
                filterRequest.getMaxPrice());

        ApiResponse<Page<Product>> apiResponse = new ApiResponse<>();
        apiResponse.setData(productService.filter(spec, pageable));
        return apiResponse;

    }

    @GetMapping("/by-category/{categoryId}")
    ApiResponse<Page<Product>> getProductByCategory(@PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id,desc") String sort) {
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
        ApiResponse<Page<Product>> apiResponse = new ApiResponse<>();
        apiResponse.setData(productService.findByCategoryId(categoryId, pageable));
        return apiResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/import-excel")
    ApiResponse<List<Product>> importExcel(@RequestBody List<CreateProductExcelReq> productReqList) {
        ApiResponse<List<Product>> apiResponse = new ApiResponse<>();
        apiResponse.setData(productService.importExcel(productReqList));
        return apiResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{productId}")
    ApiResponse<String> deleteProductById(@PathVariable Long productId) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setData(productService.deleteProductById(productId));
        return apiResponse;
    }
}
