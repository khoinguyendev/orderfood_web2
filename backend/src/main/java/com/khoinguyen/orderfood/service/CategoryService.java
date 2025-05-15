package com.khoinguyen.orderfood.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.khoinguyen.orderfood.dto.request.CreateCategoryReq;
import com.khoinguyen.orderfood.dto.request.UpdateCategoryReq;
import com.khoinguyen.orderfood.exception.CanNotDelete;
import com.khoinguyen.orderfood.exception.Exists;
import com.khoinguyen.orderfood.exception.NotFound;
import com.khoinguyen.orderfood.mapper.CategoryMapper;
import com.khoinguyen.orderfood.model.Category;
import com.khoinguyen.orderfood.repository.CategoryRepository;
import com.khoinguyen.orderfood.utils.PageDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.text.Normalizer;
import java.util.*;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final UploadFileService uploadFileService;
//    private final RedisService redisService;

    private static final String CACHE_KEY_PREFIX = "categories:";

    public Category createCategory(CreateCategoryReq createCategoryReq, MultipartFile file){
        if(categoryRepository.existsByName(createCategoryReq.getName())){
            throw new Exists("Name is already exist");
        }
        String image=uploadFileService.uploadFileImage(file);
        Category category= categoryMapper.toCategory(createCategoryReq);
       category.setSlug(toSlug(category.getName()));
       category.setImage(image);
       return categoryRepository.save(category);
    }
    public Category createCategoryNew(CreateCategoryReq createCategoryReq){
        if(categoryRepository.existsByName(createCategoryReq.getName())){
            throw new Exists("Name is already exist");
        }
        Category category= categoryMapper.toCategory(createCategoryReq);
        category.setSlug(toSlug(category.getName()));
//        redisService.deleteKeysByPrefix("categories");

        return categoryRepository.save(category);
    }
    public Category updateCategory(Long id, UpdateCategoryReq updateCategoryReq, MultipartFile file){
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFound("Category not found"));
        if (file != null && !file.isEmpty()) {
            uploadFileService.deleteFileImage(category.getImage());
            String image=uploadFileService.uploadFileImage(file);
            category.setImage(image);
        }
        categoryMapper.setUpdateCategoryRes(updateCategoryReq,category);
        category.setSlug(toSlug(category.getName()));
        return categoryRepository.save(category);
    }

    public Category updateCategoryNew(Long id, UpdateCategoryReq updateCategoryReq){
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFound("Category not found"));
//        redisService.deleteKeysByPrefix("categories");

        categoryMapper.setUpdateCategoryRes(updateCategoryReq,category);
        category.setSlug(toSlug(category.getName()));
        return categoryRepository.save(category);
    }
//    public Page<Category> getCategories(Pageable pageable) {
//        String cacheKey = generateCacheKey(pageable);
//        if (redisTemplate.hasKey(cacheKey)) {
//            // Nếu có dữ liệu trong Redis, lấy từ cache
//            String jsonData = (String) redisTemplate.opsForValue().get(cacheKey);
//
//            try {
//                // Deserialize JSON thành PageData
//                PageData pageData = objectMapper.readValue(jsonData, PageData.class);
//
//                // Tạo PageImpl từ PageData
//                List<Category> categories = pageData.getCategories();
//                Pageable pageInfo = PageRequest.of(pageData.getPage(), pageData.getSize(), pageable.getSort());
//                return new PageImpl<>(categories, pageInfo, pageData.getTotalElements());
//            } catch (Exception e) {
//
//                return Page.empty(); // Trả về trang rỗng nếu có lỗi
//            }
//        } else {
//            // Nếu không có, truy vấn dữ liệu từ cơ sở dữ liệu và lưu vào Redis
//            Page<Category> categories = categoryRepository.findAll(pageable);
//            saveCategoriesToRedis(cacheKey, categories);
//            return categories;
//        }
//    }
    public Category getCategoryById(Long id){
        return  categoryRepository.findById(id)
                .orElseThrow(() -> new NotFound("Category not found"));
    }

    public  String toSlug(String input) {
        if (input == null || input.isEmpty()) {
            return "";
        }
        // Chuyển thành chữ thường
        String normalized = input.toLowerCase(Locale.ROOT);
        // Chuẩn hóa ký tự Unicode (loại bỏ dấu tiếng Việt)
        normalized = Normalizer.normalize(normalized, Normalizer.Form.NFD);
        normalized = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        // Thay thế khoảng trắng và ký tự đặc biệt bằng dấu '-'
        normalized = normalized.replaceAll("[^a-z0-9\\s]", ""); // Loại bỏ ký tự đặc biệt
        normalized = normalized.trim().replaceAll("\\s+", "-"); // Thay thế khoảng trắng bằng '-'
        return normalized;
    }

    @Transactional
    public List<Category> importExcel(List<CreateCategoryReq> categoryReqList) {
        Map<String, Category> categoryCache = new HashMap<>();

        List<Category> categories = categoryReqList.stream().map(req -> {
            // Kiểm tra danh mục có tồn tại không
            Category category = new Category();
            category.setName(req.getName());
            category.setSlug(toSlug(req.getName()));
            category.setImage(req.getImage());


            return category;
        }).collect(Collectors.toList());

        List<Category> c= categoryRepository.saveAll(categories);
//        redisService.deleteKeysByPrefix("categories");
        return c;
    }


    public PageDTO<Category> getCategories(Pageable pageable){
//        String cacheKey = redisService.generateCacheKey(CACHE_KEY_PREFIX, pageable);
//
//        if (redisService.hasKey(cacheKey)) {
//            PageDTO<Category> pageDTO = redisService.readFromRedis(cacheKey, new TypeReference<PageDTO<Category>>() {});
//            return pageDTO != null ? pageDTO : new PageDTO<>(new ArrayList<>(), 0, pageable.getPageSize(), 0, 0); // Trả về PageDTO rỗng nếu có lỗi
//        } else {
//            Page<Category> categories = categoryRepository.findAll(pageable);
//            redisService.saveToRedis(cacheKey, new PageDTO<Category>(categories.getContent(), categories.getNumber(), categories.getSize(), categories.getTotalElements(), categories.getTotalPages()));
//            return new PageDTO<Category>(categories.getContent(), categories.getNumber(), categories.getSize(), categories.getTotalElements(), categories.getTotalPages());
//        }
        Page<Category> categories = categoryRepository.findAll(pageable);
        return new PageDTO<Category>(categories.getContent(), categories.getNumber(), categories.getSize(), categories.getTotalElements(), categories.getTotalPages());

    }

    public String deleteCategoryById(Long id){
        try {
            Category category=  categoryRepository.findById(id)
            .orElseThrow(() -> new NotFound("Category not found"));
            categoryRepository.delete(category);
//            redisService.deleteKeysByPrefix("categories");

            return "Delete success";
        } catch (Exception e) {
            // TODO: handle exception
                        throw new CanNotDelete("Can not delete this category!");

        }
    }
}
