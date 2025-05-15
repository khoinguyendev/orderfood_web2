import { useState } from "react";

const ProductInfo = () => {
  const [quantity, setQuantity] = useState(5);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newValue = quantity - 1;
      setQuantity(newValue);
    }
  };

  const handleIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10) || 1;
    setQuantity(newValue);
  };
  return (
    <div className="text-gray1">
      <h4 className="font-bold text-lg text-gray1">Samsung glaxy Note 21</h4>
      <p className="text-md my-3">
        Thương hiệu: <span className="font-bold">Samsung</span>
      </p>
      <div>
        <span className="text-primary font-bold text-2xl">29.000.000</span>
        <span className="text-sm ms-5">Giá gốc: 29.000.000</span>
      </div>
      <div className="my-2">
        <p>
          <span className="text-green_btn text-sm">Tiết kiệm:</span>
          <span className="text-primary font-bold text-sm line-through"> 1.500.000</span>
        </p>
      </div>
      <div className="flex items-center">
        <button className="text-white bg-primary border border-gray-300 h-8 w-8 flex items-center justify-center text-lg" onClick={handleDecrease}>
          -
        </button>
        <input type="number" value={quantity} onChange={handleChange} className="border font-bold border-gray-300 h-8 w-16 text-center no-spinner" />
        <button className="text-white bg-primary border border-gray-300 h-8 w-8 flex items-center justify-center text-lg" onClick={handleIncrease}>
          +
        </button>
      </div>
      <div className="flex gap-3 my-3">
        <div>
          <button className="bg-primary text-white px-5 py-2 rounded-md">Thêm vào giỏ hàng</button>
        </div>
        <div>
          <button className="bg-green_btn text-white px-5 py-2 rounded-md">Mua ngay</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
