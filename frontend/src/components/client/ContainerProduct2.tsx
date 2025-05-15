const ContainerProduct2 = () => {
  return (
    <div>
      <h2 className="border-b-primary border-b-4 ">
        <button className="bg-primary text-white px-5 py-2 font-bold rounded-t-lg">Đồ công nghệ</button>
      </h2>
      <div className="grid grid-cols-12 py-2">
        <div className="hidden col-span-4 lg:flex py-2">
          {/* <SwiperWrapper slidesPerView={1} spaceBetween={0} loop={false} pagination={true} navigation={false}>
            {images.map((item) => (
              <Link to="#">
                <img className="lazyload loaded w-full object-cover h-full" src={item} alt="Slide 1" data-src={item} data-was-processed="true" />
              </Link>
            ))}
          </SwiperWrapper> */}
        </div>

        {/* {products.map((item, index) => (
          <div className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <ItemProductSlide key={index} product={item} />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ContainerProduct2;
