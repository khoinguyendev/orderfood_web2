package com.khoinguyen.orderfood.controller;

import com.khoinguyen.orderfood.dto.response.ApiResponse;
import com.khoinguyen.orderfood.service.CloudinaryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/files")
public class CloudinaryController {

    private final CloudinaryService cloudinaryService;

    public CloudinaryController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

//    @PostMapping("/upload/image")
//    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,
//                                         @RequestParam("folder") String folderName) throws IOException {
//        return ResponseEntity.ok(cloudinaryService.uploadFile(file, folderName));
//    }
@PreAuthorize("hasRole('ADMIN')")
@PostMapping("/upload/image")
    public ApiResponse<List<?>> uploadImages(@RequestParam("files") MultipartFile[] file,
                                       @RequestParam(value = "folder",required = false) String folderName) throws IOException {
        ApiResponse<List<?>> apiResponse=new ApiResponse<>();
        apiResponse.setData(cloudinaryService.uploadAndSaveMultipleFiles(file, folderName!=null?folderName:"product"));
        apiResponse.setMessage("Upload image success");
        return apiResponse;

    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/upload/video")
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file,
                                         @RequestParam("folder") String folderName) throws IOException {
        return ResponseEntity.ok(cloudinaryService.uploadVideo(file, folderName));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteImage(@RequestParam String publicId) {
        try {

            String result = cloudinaryService.deleteFile(publicId);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting file");
        }
    }
}
