package com.khoinguyen.orderfood.mapper;

import com.khoinguyen.orderfood.dto.request.CreateCategoryReq;
import com.khoinguyen.orderfood.dto.request.UpdateCategoryReq;
import com.khoinguyen.orderfood.model.Category;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CreateCategoryReq categoryRes);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void setUpdateCategoryRes(UpdateCategoryReq updateCategoryReq, @MappingTarget Category category);
}
