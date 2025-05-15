package com.khoinguyen.orderfood.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.khoinguyen.orderfood.dto.request.CreateProductExcelReq;
import com.khoinguyen.orderfood.dto.request.CreateProductReq;
import com.khoinguyen.orderfood.dto.request.UpdateProductReq;
import com.khoinguyen.orderfood.exception.CanNotDelete;
import com.khoinguyen.orderfood.exception.Exists;
import com.khoinguyen.orderfood.exception.NotFound;
import com.khoinguyen.orderfood.mapper.ProductMapper;

import com.khoinguyen.orderfood.model.Category;
import com.khoinguyen.orderfood.model.Product;
import com.khoinguyen.orderfood.repository.CategoryRepository;
import com.khoinguyen.orderfood.repository.ProductRepository;
import com.khoinguyen.orderfood.utils.PageDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;
    private final UploadFileService uploadFileService;
    private final ProductMapper productMapper;
//    private final RedisService redisService;

    private static final String CACHE_KEY_PREFIX = "products:";
    public Product createProduct(CreateProductReq createProductReq, MultipartFile file){
        Category category=categoryRepository
                .findById(createProductReq.getCategoryId())
                .orElseThrow(()->new NotFound("Category not found"));
        if(productRepository.existsByName(createProductReq.getName())){
            throw new Exists("Name is already exist");
        }
        String image=uploadFileService.uploadFileImage(file);
        Product product= productMapper.toProduct(createProductReq);
        product.setImage(image);
        product.setCategory(category);
        return productRepository.save(product);
    }
    public Product createProductNew(CreateProductReq createProductReq){
        Category category=categoryRepository
                .findById(createProductReq.getCategoryId())
                .orElseThrow(()->new NotFound("Category not found"));
        if(productRepository.existsByName(createProductReq.getName())){
            throw new Exists("Name is already exist");
        }
        ObjectMapper mapper = new ObjectMapper();

        Product product= productMapper.toProduct(createProductReq);
        product.setCategory(category);
        try {
            String json = mapper.writeValueAsString(createProductReq.getImage());
            product.setImage(json);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
//        redisService.deleteKeysByPrefix("products");

        return productRepository.save(product);
    }
    public Product updateProduct(Long id,UpdateProductReq updateProductReq, MultipartFile file){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFound("Product not found"));
        if(updateProductReq.getCategoryId()!=null){
            Category category = categoryRepository.findById(updateProductReq.getCategoryId())
                    .orElseThrow(() -> new NotFound("Category not found"));
            product.setCategory(category);
        }
        if (file != null && !file.isEmpty()) {
            uploadFileService.deleteFileImage(product.getImage());
            String image=uploadFileService.uploadFileImage(file);
            product.setImage(image);
        }
        productMapper.setUpdateProductRes(updateProductReq,product);
        return productRepository.save(product);
    }
    public Product updateProductNew(Long id,UpdateProductReq updateProductReq){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFound("Product not found"));
        if(updateProductReq.getCategoryId()!=null){
            Category category = categoryRepository.findById(updateProductReq.getCategoryId())
                    .orElseThrow(() -> new NotFound("Category not found"));
            product.setCategory(category);
        }
        ObjectMapper mapper = new ObjectMapper();

        productMapper.setUpdateProductRes(updateProductReq,product);
        try {
            String json = mapper.writeValueAsString(updateProductReq.getImage());
            product.setImage(json);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        Product product1= productRepository.save(product);
//        redisService.deleteKeysByPrefix("products");
        return product1;
    }
    public PageDTO<Product> getProducts(Pageable pageable,Boolean available) {

        if(available!=null){
//            String cacheKey = redisService.generateCacheKey(CACHE_KEY_PREFIX+available.toString()+":", pageable);
//            if (redisService.hasKey(cacheKey)) {
//                PageDTO<Product> pageDTO = redisService.readFromRedis(cacheKey, new TypeReference<PageDTO<Product>>() {});
//                return pageDTO != null ? pageDTO : new PageDTO<>(new ArrayList<>(), 0, pageable.getPageSize(), 0, 0); // Trả về PageDTO rỗng nếu có lỗi
//            } else {
//                Page<Product> products = productRepository.findByAvailable(pageable,available);
//                PageDTO<Product> pageDTO= PageDTO.<Product>builder()
//                        .content(products.getContent())
//                        .number(products.getNumber())
//                        .size(products.getSize())
//                        .totalElements(products.getTotalElements())
//                        .totalPages(products.getTotalPages())
//                        .build();
//                redisService.saveToRedis(cacheKey, pageDTO);
//                return pageDTO;
//            }
            Page<Product> products = productRepository.findByAvailable(pageable,available);
            PageDTO<Product> pageDTO= PageDTO.<Product>builder()
                    .content(products.getContent())
                    .number(products.getNumber())
                    .size(products.getSize())
                    .totalElements(products.getTotalElements())
                    .totalPages(products.getTotalPages())
                    .build();
//            redisService.saveToRedis(cacheKey, pageDTO);
            return pageDTO;
        }
//        String cacheKey = redisService.generateCacheKey(CACHE_KEY_PREFIX, pageable);
//        if (redisService.hasKey(cacheKey)) {
//            PageDTO<Product> pageDTO = redisService.readFromRedis(cacheKey, new TypeReference<PageDTO<Product>>() {});
//            return pageDTO != null ? pageDTO : new PageDTO<>(new ArrayList<>(), 0, pageable.getPageSize(), 0, 0); // Trả về PageDTO rỗng nếu có lỗi
//        }
        Page<Product> products =  productRepository.findAll(pageable);
        PageDTO<Product> pageDTO= PageDTO.<Product>builder()
                .content(products.getContent())
                .number(products.getNumber())
                .size(products.getSize())
                .totalElements(products.getTotalElements())
                .totalPages(products.getTotalPages())
                .build();
//        redisService.saveToRedis(cacheKey, pageDTO);

        return pageDTO;
    }
    public Product getProductById(Long id){
        return productRepository.findById(id)
                .orElseThrow(() -> new NotFound("Product not found"));
    }
    public Page<Product> filter(Specification<Product> spec,Pageable pageable){
        return productRepository.findAll(spec,pageable);
    }

    public Page<Product> searchProducts(String keyword,Pageable pageable){
        return productRepository.searchByKeyword(keyword,pageable);
    }
    public Page<Product> findByCategoryId(Long id,Pageable pageable){
        return productRepository.findByCategoryIdAndAvailableTrue(id,pageable);
    }
    public String deleteProductById(Long id){
        try {
           Product product= productRepository.findById(id)
            .orElseThrow(() -> new NotFound("Product not found"));
            productRepository.delete(product);
//            redisService.deleteKeysByPrefix("products");

            return "Delete success";
        } catch (Exception e) {
            throw new CanNotDelete("Can not delete this product!");
        }
    }
    @Transactional
    public List<Product> importExcel(List<CreateProductExcelReq> productReqList) {
        Map<String, Category> categoryCache = new HashMap<>();

        List<Product> products = productReqList.stream().map(req -> {
            // Kiểm tra danh mục có tồn tại không
            Category category = categoryCache.computeIfAbsent(req.getCategoryName(), categoryName -> {
                return categoryRepository.findByName(categoryName)
                        .orElseGet(() -> {
                            Category newCategory = new Category();
                            newCategory.setName(categoryName);
                            newCategory.setSlug(categoryService.toSlug(categoryName));
                            return categoryRepository.save(newCategory);
                        });
            });
            ObjectMapper mapper = new ObjectMapper();

           
            // Tạo product từ request
            Product product = new Product();
            product.setName(req.getName());
            product.setDescription(req.getDescription());
            product.setPrice(req.getPrice());
            product.setAvailable(req.isAvailable());
            try {
                String json = mapper.writeValueAsString(req.getImage());
                product.setImage(json);
            } catch (JsonProcessingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            product.setCategory(category);

            return product;
        }).collect(Collectors.toList());
        List<Product> products1=productRepository.saveAll(products);
//        redisService.deleteKeysByPrefix("products");

        return products1;
    }
}
