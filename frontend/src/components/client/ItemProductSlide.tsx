import { useState } from "react";
import { IProduct} from "../../types/Product";
import { formatCurrency, urlList } from "../../util/Format";

import ProductModel from "./ProductModel";

const ItemProductSlide = ({ product, shadow = true }: { product: IProduct; shadow?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
 
  return (
    <>
      {/* Nút mở modal */}
      <div
        onClick={() => setOpenModal(true)}
        className={`block cursor-pointer relative bg-white w-full rounded-md overflow-hidden ${shadow && "shadow-lg"}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="w-full h-[230px] rounded mb-2 overflow-hidden">
          <img className={`scale-100 w-full h-full object-cover ${open && "scale-110"} duration-500`} src={urlList(product.image)} alt="Product" />
        </div>
        <div className="py-2 px-4">
          <p className="font-bold text-[15px] leading-5 text-gray1 line-clamp-2 h-[40px] text-left">{product.name}</p>
          <div className="flex justify-between">
            <p className="text-gray1 font-bold">{formatCurrency(product.price)}</p>
            <button className="text-gray1 bg-primary font-bold h-6 w-6 rounded-md flex items-center justify-center text-lg">+</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
       <ProductModel setOpenModal={setOpenModal} product={product}/>
      )}
    </>
  );
};

export default ItemProductSlide;
