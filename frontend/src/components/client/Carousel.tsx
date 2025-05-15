import SwiperWrapper from "./SwiperWrapper";

const slides = [
  {
    image: "https://sadesign.vn/pictures/picfullsizes/2024/11/30/ybd1732939646.jpg",
    title: "1",
  },
  {
    image: "https://sadesign.vn/pictures/picfullsizes/2024/11/30/ybd1732939646.jpg",
    title: "2",
  },
  {
    image: "https://sadesign.vn/pictures/picfullsizes/2024/11/30/ybd1732939646.jpg",
    title: "3",
  },
];

const Carousel = () => {
  return (
    <SwiperWrapper slidesPerView={1} navigation={false}>
      {slides.map((slide, index) => (
        <img key={index} className="h-[400px] object-cover w-full" src={slide.image} alt={slide.title} />
      ))}
    </SwiperWrapper>
  );
};

export default Carousel;
