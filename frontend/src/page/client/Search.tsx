import Bread from "../../components/client/Bread";

const Search = () => {
  return (
    <div>
      <div className="custom-container py-3">
        <Bread title="Tìm kiếm" />
        <div className="my-4">
          <h3 className="text-gray1 font-bold text-xl uppercase ">Trang tìm kiếm</h3>
        </div>
        <hr className="border border-primary" />
        <p className="text-sm text-gray1 my-2">Đã tìm thấy 2 kết quả phù hợp</p>
        {/* <div className="grid grid-cols-4 gap-3 mt-2">
          {products.map((item, index) => (
            <ItemProductSlide key={index} product={item} shadow={true} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Search;
