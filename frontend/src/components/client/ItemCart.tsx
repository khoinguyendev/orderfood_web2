import { useDispatch } from "react-redux";
import { formatCurrency,  urlList } from "../../util/Format";
import { CartItem, removeFromCart, updateMessage, updateQuantity } from "../../redux/cartSlice";
import { useState } from "react";

const ItemCart = ({ item }: { item: CartItem }) => {
  const [message, setMessage] = useState(() => item.message);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(updateMessage({ id: item.id, message: message }));
    setOpenModal(false);
  };
  return (
    <>
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <img src={urlList(item.image)} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
        <div className="flex-1 ml-3">
          <p className="font-medium">{item.name}</p>
          <p className="text-gray-600">{formatCurrency(item.totalPrice)}</p>
          <div className="flex items-center mt-2">
            <button className="bg-gray-200 px-2 py-1 rounded" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} disabled={item.quantity <= 1}>
              -
            </button>
            <span className="px-3">{item.quantity}</span>
            <button className="bg-gray-200 px-2 py-1 rounded" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
              +
            </button>
          </div>
        </div>
        <button onClick={() => setOpenModal(true)} className="text-primary text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
        <button className="text-red text-lg" onClick={() => dispatch(removeFromCart(item.id))}>
          ✖
        </button>
      </div>
      {openModal && (
        <div className="fixed inset-0 flex items-center duration-400 justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[600px] rounded-lg shadow-lg relative px-3">
            <button onClick={() => setOpenModal(false)} className="absolute h-10 w-10 rounded-full flex items-center justify-center bg-white -top-0 -right-0 text-gray1 text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mt-4">
              <img src={urlList(item.image)} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
              <p className="font-medium">{item.name}</p>

              <label htmlFor="quantity" className="block text-sm font-medium text-gray-400">
                Viết lời nhắn cho cửa hàng
              </label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full mt-2 border border-gray-300 rounded-lg p-3 text-gray-500" rows={2} />
            </div>
            <div className="my-4">
              <button onClick={handleSave} className="w-full bg-primary text-gray1 font-medium py-2 px-4 rounded text-sm">
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemCart;
