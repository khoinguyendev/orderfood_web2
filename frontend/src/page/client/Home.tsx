import { useEffect, useState } from "react";
import ItemProductSlide from "../../components/client/ItemProductSlide";
import SlideCategory from "../../components/client/SlideCategory";
import { IProduct } from "../../types/Product";
import { ICategory } from "../../types/Category";
import axios from "axios";
import { SERVER_HOST } from "../../config/Url";
import ProductSkeleton from "../../components/client/ProductSkeleton";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  // const [productsOld, setProductsOld] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const responseP = await axios.get(`${SERVER_HOST}/products?available=true&page=${pageCurrent - 1}`);
        // if (pageCurrent > 1) {
        //   setProductsOld((pre) => [...pre, ...products]);
        // }
        // setProducts(responseP.data.data.content);
        const newProducts: IProduct[] = responseP.data.data.content;

        setProducts((prev) => [...prev, ...newProducts]);
        if (totalPages != responseP.data.data.totalPages) setTotalPages(responseP.data.data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageCurrent]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseC = await axios.get(`${SERVER_HOST}/categories`);
        setCategories(responseC.data.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  //     // Gần chạm đáy (100px trở xuống)
  //     if (scrollTop + clientHeight >= scrollHeight - 200 && !isLoading && pageCurrent < (totalPages || 0)) {
  //       setPageCurrent((prev) => prev + 1);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isLoading, pageCurrent, totalPages]);
  return (
    <div className="custom-container">
      <div className="my-5 mt-10">
        <h2 className="text-gray1 font-medium text-4xl mb-5">Danh mục món ăn</h2>
        <SlideCategory isLoading={isLoading} categories={categories} />
      </div>
      <div className="my-5 mt-10">
        <h2 className="text-gray1 font-medium text-4xl mb-5">Món ăn nổi bật</h2>
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
        {totalPages && pageCurrent < totalPages && (
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={() => setPageCurrent((pre) => pre + 1)}
              disabled={isLoading}
              className="mt-3 gap-2 border border-1 border-primary  text-gray1 font-medium py-2 px-4 rounded text-base"
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
