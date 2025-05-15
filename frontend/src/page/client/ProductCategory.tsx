import { useEffect, useState } from "react";
import ItemProductSlide from "../../components/client/ItemProductSlide";
import { SERVER_HOST } from "../../config/Url";
import axios from "axios";
import { IProduct } from "../../types/Product";
import { useParams } from "react-router-dom";
import ProductSkeleton from "../../components/client/ProductSkeleton";

const ProductCategory = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [sortType, setSortType] = useState<"price,asc" | "price,desc" | null>(null);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${SERVER_HOST}/products/by-category/${id}?page=${pageCurrent - 1}&sort=${sortType ?? "id,desc"}`);
        setProducts(response.data.data.content);
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageCurrent,sortType]);

  return (
    <div className="bg-[#fcfcfc]">
      <div className="custom-container py-4 ">
        <h2 className="text-gray1 font-medium text-4xl mb-5">Món ăn</h2>
        {products.length > 0 && (
          <div className="flex gap-4 mb-5">
            <button
              onClick={() => {
                setPageCurrent(1);
                setSortType("price,asc");
              }}
              className={`border px-4 py-2 rounded hover:bg-gray-100 ${sortType === "price,asc" ? "bg-primary text-white border-primary" : ""
                }`}
            >
              Giá từ thấp đến cao
            </button>
            <button
              onClick={() => {
                setPageCurrent(1);
                setSortType("price,desc");
              }}
              className={`border px-4 py-2 rounded hover:bg-gray-100 ${sortType === "price,desc" ? "bg-primary text-white border-primary" : ""
                }`}
            >
              Giá từ cao đến thấp
            </button>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((item) => (
            <ItemProductSlide key={item.id} product={item} />
          ))}
        </div>
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}
        {totalPages !== null && totalPages > 0 && pageCurrent < totalPages && (
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={() => setPageCurrent((pre) => pre + 1)}
              disabled={isLoading}
              className="mt-3 gap-2 border border-1 border-primary text-gray1 font-medium py-2 px-4 rounded text-base"
            >
              Xem thêm
            </button>
          </div>
        )}
        {!isLoading && products.length == 0 && <p>Món ăn đang được cập nhật</p>}
      </div>
    </div>
  );
};

export default ProductCategory;
