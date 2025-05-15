package com.khoinguyen.orderfood.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageDto {
    private String url;
    private String folder;
    private String publicId;
}
