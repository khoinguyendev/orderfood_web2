package com.khoinguyen.orderfood.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.khoinguyen.orderfood.model.Image;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service

public class CloudinaryService {

    private final Cloudinary cloudinary;
    private final ImageService imageService;
//    private final RedisService redisService;
    public CloudinaryService(Cloudinary cloudinary,ImageService imageService) {
        this.cloudinary = cloudinary;
        this.imageService=imageService;
//        this.redisService=redisService;
    }

    public Map uploadFile(MultipartFile file, String folderName) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "folder", folderName

                ));
    }
//    public List<Map> uploadMultipleFiles(MultipartFile[] files, String folderName) throws IOException {
//        List<Map> uploadedFiles = new ArrayList<>();
//
//        for (MultipartFile file : files) {
//            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
//                    ObjectUtils.asMap("folder", folderName));
//            uploadedFiles.add(uploadResult);
//        }
//
//        return uploadedFiles;
//    }
    public Map uploadVideo(MultipartFile file, String folderName) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "video",
                        "folder", folderName
                ));
    }
    // ✅ Hàm xóa ảnh theo publicId
    public String deleteFile(String publicId) throws IOException {
        Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        if(result.get("result").equals("ok")){
            return imageService.deleteImage(publicId);
        }
        return "Not found";
    }

    public List<Image> uploadAndSaveMultipleFiles(MultipartFile[] files, String folderName) throws IOException {
        List<Image> imageList = new ArrayList<>();

        for (MultipartFile file : files) {
            // Upload lên Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("folder", folderName,"public_id", UUID.randomUUID().toString()));

            // Tạo đối tượng Image từ kết quả trả về
            Image image = Image.builder()
                    .url((String) uploadResult.get("secure_url"))
                    .publicId((String) uploadResult.get("public_id"))
                    .folder(folderName)
                    .build();

            imageList.add(image);
        }

        // Lưu tất cả ảnh vào DB
        List<Image> images= imageService.saveAll(imageList);
//        redisService.deleteKeysByPrefix("images");
        return images;
    }
}
