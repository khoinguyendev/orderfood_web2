package com.khoinguyen.orderfood.service;

import com.khoinguyen.orderfood.exception.NotFound;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;
@Service
public class UploadFileService {
    public String uploadFileImage(MultipartFile file){
        try {
            File uploadFolder = getFile(file);
            if (!uploadFolder.exists()) {
                uploadFolder.mkdirs(); // Tạo thư mục nếu chưa tồn tại
            }
            String child= UUID.randomUUID()+ file.getOriginalFilename();
            File destFile = new File(uploadFolder, child);
            file.transferTo(destFile);

            return child;
        } catch (Exception e) {
            throw  new RuntimeException(e.getMessage());
        }
    }
    public void deleteFileImage(String fileName) {
        String uploadDir = new File("uploads").getAbsolutePath(); // Thư mục lưu ảnh
        File file = new File(uploadDir, fileName);

        if (!file.exists()) {
            throw new NotFound("File not found: " + fileName);
        }

        if (!file.delete()) {
            throw new RuntimeException("Failed to delete file: " + fileName);
        }
    }

    private static File getFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        if(fileName==null){
            throw new NotFound("Not found image");
        }
        String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
        if (!fileExtension.matches("png|jpg|jpeg")) {
            throw new RuntimeException("Not image");
        }
        String uploadDir = new File("uploads").getAbsolutePath(); // Thư mục ngang hàng với src/
        return new File(uploadDir);
    }
}
