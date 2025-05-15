import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { ReactNode } from "react";

interface SwiperWrapperProps {
  children: ReactNode[];
  slidesPerView?: number;
  loop?: boolean;
  navigation?: boolean;
  pagination?: boolean;
  spaceBetween?: number;
  breakpoints?: any;
}

const SwiperWrapper = ({ children, pagination = true, slidesPerView = 1, breakpoints, loop = true, spaceBetween = 10, navigation = true }: SwiperWrapperProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      pagination={pagination ? { clickable: true } : undefined} // Chỉ thêm pagination khi cần
      loop={loop}
      breakpoints={breakpoints}
      navigation={navigation ? true : undefined}
      className="hh"
    >
      {children && children.map((child, index) => <SwiperSlide key={index}>{child}</SwiperSlide>)}
    </Swiper>
  );
};

export default SwiperWrapper;
