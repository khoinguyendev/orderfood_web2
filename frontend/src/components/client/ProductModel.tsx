import { useDispatch } from "react-redux";
import { IProduct, IProductOrder } from "../../types/Product"
import SwiperWrapper from "./SwiperWrapper"
import { useEffect, useState } from "react";
import { addToCart, openCart } from "../../redux/cartSlice";
import { formatCurrency } from "../../util/Format";
import ListReviewModal from "./ListReviewModel";

const ProductModel = ({ product, setOpenModal }: { product: IProduct, setOpenModal: any }) => {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [openReview, setOpenReview] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const order: IProductOrder = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      message: message,
      quantity: quantity,
      totalPrice: product.price * quantity,
    };
    dispatch(addToCart(order));
    dispatch(openCart()); // Mở giỏ hàng sau khi thêm
    setOpenModal(false);
  };
  const handleChange = (s: string) => {
    if (s == "cong") setQuantity((pre) => pre + 1);
    else {
      if (quantity < 2) return;
      else setQuantity((pre) => pre - 1);
    }
  };
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center  duration-400 justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[600px] rounded-lg shadow-lg relative mx-2 md:mx-none">
        <button onClick={() => setOpenModal(false)} className="absolute h-10 w-10 rounded-full z-50 flex items-center justify-center bg-white -top-5 -right-5 text-gray1 text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="h-[90vh] overflow-y-auto rounded-lg">
          <SwiperWrapper
            slidesPerView={1}
            spaceBetween={0}
            loop={false}
            pagination={false}

          >
            {JSON.parse(product.image).map((src: string) => <img src={src} alt="Product" className="overflow-hidden w-full h-80 object-cover rounded-t-lg" />)
            }
          </SwiperWrapper>
          <div className="py-6 px-6">
            <div className="flex justify-between gap-5 items-center">
              <h2 className="text-xl font-medium line-clamp-2">{product.name}</h2>
              <p className="text-gray1 font-medium text-xl">{formatCurrency(product.price)}</p>
            </div>
            <div className="mt-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-400">
                Viết lời nhắn cho cửa hàng
              </label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full mt-2 border border-gray-300 rounded-lg p-3 text-gray-500" rows={2} />
            </div>
            <button
              onClick={() => setOpenReview(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Xem đánh giá sản phẩm
            </button>
            <div className="mt-6 flex flex-col gap-3 items-center w-full">
              {/* Bộ đếm sản phẩm */}
              <div className="flex items-center gap-2">
                <button onClick={() => handleChange("tru")} className="text-gray1 bg-primary font-bold h-8 w-8 rounded-md flex items-center justify-center text-lg">
                  -
                </button>
                <span className="px-3 text-lg font-medium">{quantity}</span>
                <button onClick={() => handleChange("cong")} className="text-gray1 bg-primary font-bold h-8 w-8 rounded-md flex items-center justify-center text-lg">
                  +
                </button>
              </div>

              {/* Nút Đặt hàng */}
              <button
                className="w-full bg-primary text-gray1 font-medium py-3 px-4 rounded text-lg"
                onClick={handleAddToCart} // Mở giỏ hàng khi nhấn
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      {openReview && (
        <ListReviewModal
          productId={product.id}
          productName={product.name}
          setOpenModal={() => setOpenReview(false)}
        />
      )}
    </div>
  )
}

export default ProductModel