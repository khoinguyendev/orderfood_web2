import SwiperWrapper from "./SwiperWrapper";
const images = [
  "https://sadesign.vn/pictures/picfullsizes/2024/11/30/ybd1732939646.jpg",
  "https://sadesign.vn/pictures/picfullsizes/2024/11/30/ybd1732939646.jpg",
  "https://sadesign.vn/pictures/picfullsizes/2024/11/30/ybd1732939646.jpg",
  "https://sadesign.vn/pictures/picfullsizes/2024/11/30/ybd1732939646.jpg",
  "https://sadesign.vn/pictures/picfullsizes/2024/11/30/ybd1732939646.jpg",
  "https://sadesign.vn/pictures/picfullsizes/2024/11/30/ybd1732939646.jpg",
  "https://sadesign.vn/pictures/picfullsizes/2024/11/30/ybd1732939646.jpg",
];
const ProductImage = () => {
  return (
    <>
      <div>
        <SwiperWrapper slidesPerView={1} spaceBetween={0} loop={false} pagination={false} navigation={false}>
          {images.map((index) => (
            <div className="w-full py-3" key={index}>
              <img
                className=" w-[350] object-cover h-[350px]"
                src="https://bizweb.dktcdn.net/thumb/large/100/429/689/products/galaxy-s21-plus-5g-bac-didongviet-1-719e9485-fd05-4c6d-bd44-7e5f6ed19132.jpg?v=1623565400993"
              />
            </div>
          ))}
        </SwiperWrapper>
      </div>
      <div>
        <SwiperWrapper slidesPerView={5} spaceBetween={10} loop={false} pagination={false} navigation={true}>
          {images.map((index) => (
            <div className="w-full p-1 border border-gray2 rounded-lg" key={index}>
              <img
                className=" w-[55px] object-cover h-[55px]"
                src="https://bizweb.dktcdn.net/thumb/large/100/429/689/products/galaxy-s21-plus-5g-bac-didongviet-1-719e9485-fd05-4c6d-bd44-7e5f6ed19132.jpg?v=1623565400993"
              />
            </div>
          ))}
        </SwiperWrapper>
      </div>
    </>
  );
};

export default ProductImage;
