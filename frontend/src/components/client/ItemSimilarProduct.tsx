import { useState } from "react";
import { Link } from "react-router-dom";

const ItemSimilarProduct = () => {
  const [open, setOpen] = useState(false);

  return (
    <Link to="#" className="flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="w-[120px] h-[120px] mb-2 overflow-hidden py-2">
        <img
          className={`scale-100 w-full h-full object-cover ${open && "scale-110"} duration-500`}
          src="https://bizweb.dktcdn.net/thumb/medium/100/429/689/products/galaxy-s21-ultra-5g-black-didongviet.jpg?v=1623565189073"
          alt="Product"
        />
      </div>
      <div className="py-2">
        <p className="text-sm font-bold line-clamp-2 text-gray1">Samsung Galaxy S21 utra view</p>
        <p className="text-primary font-bold">260.000.000</p>
        <span className="text-gray2  text-sm line-through"> 1.500.000</span>
      </div>
    </Link>
  );
};

export default ItemSimilarProduct;
