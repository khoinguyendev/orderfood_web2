package com.khoinguyen.orderfood.mapper;


import com.khoinguyen.orderfood.dto.request.ImageDto;
import com.khoinguyen.orderfood.model.Image;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    List<Image> toImage(List<ImageDto> imageDto);
}
