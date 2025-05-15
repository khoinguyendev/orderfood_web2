import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { clearCart, closeCart } from "../../redux/cartSlice";
import { SERVER_HOST } from "../../config/Url";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoading from "../admin/ButtonLoading";
import ItemCart from "./ItemCart";
import { openMap, setAdress } from "../../redux/mapSlice";
import { z } from "zod";
const phoneSchema = z.string().regex(/^(0[1-9][0-9]{8}|84[1-9][0-9]{8})$/, "Số điện thoại không hợp lệ");
const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token, user } = useSelector((state: RootState) => state.auth);
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const reduxAddress = useSelector((state: RootState) => state.map.address);
  const [address, setAddress] = useState<string | undefined>(() => user?.address);
  const [phone, setPhone] = useState<string | undefined>(() => user?.phone);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      // Validate phone
      phoneSchema.parse(phone);
    } catch (error) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }
    if (address == "") {
      toast.error("Địa chỉ không được để trống");
      return;
    }
    const transformedOrder = {
      totalPrice: items.reduce((sum, item) => sum + item.totalPrice, 0),
      status: "PENDING",
      paymentMethod: "CASH",
      orderDetails: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,

        message: item.message,
      })),
      phone,
      address,
    };

    const confirm = window.confirm("Bạn có chắc chắn muốn đặt hàng không?");
    if (!confirm) return;

    try {
      setIsLoading(true);
      const response = await axios.post(`${SERVER_HOST}/orders`, transformedOrder);
      console.log(response);
      dispatch(closeCart());
      dispatch(clearCart());
      dispatch(setAdress(""));

      setAddress("");
      setPhone("");
      toast.success("Đặt hàng thành công");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt của bạn không hỗ trợ định vị.");
      return;
    }

    try {
      const permission = await navigator.permissions.query({ name: "geolocation" });

      if (permission.state === "denied") {
        alert("Bạn đã từ chối quyền truy cập vị trí. Vui lòng bật lại trong cài đặt trình duyệt.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Vị trí hiện tại:", position.coords.latitude, position.coords.longitude);
          dispatch(openMap()); // Mở bản đồ sau khi lấy vị trí thành công
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert("Bạn đã từ chối quyền truy cập vị trí.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            alert("Không thể lấy thông tin vị trí.");
          } else if (error.code === error.TIMEOUT) {
            alert("Yêu cầu vị trí quá thời gian.");
          } else {
            alert("Lỗi không xác định khi lấy vị trí.");
          }
        }
      );
    } catch (error) {
      console.error("Lỗi khi kiểm tra quyền vị trí:", error);
    }
  };
  useEffect(() => {
    if (reduxAddress) setAddress(reduxAddress)
    else setAddress(user?.address);

  }, [reduxAddress]);
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-40"
          onClick={() => dispatch(closeCart())} // Đóng giỏ hàng khi click nền
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-full md:w-[400px] overflow-y-auto pb-5  h-full bg-white shadow-xl transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-5 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Giỏ hàng</h2>
          <button onClick={() => dispatch(closeCart())} className="text-gray-500">
            ✖
          </button>
        </div>

        <div className="p-5">{items.length === 0 ? <p className="text-gray-600">Giỏ hàng trống</p> : items.map((item) => <ItemCart key={item.id} item={item} />)}</div>
        <div className="px-3 ">
          {items.length > 0 && (
            <>
              {/* <div className="my-4">
              <label className="block text-sm font-medium text-gray-400">Tên người nhận:</label>
              <input type="text" className="w-full mt-2 border outline-none border-gray-300 rounded-lg px-3 py-1 text-gray-500" />
            </div> */}
              <div className="my-4">
                <label className="block text-sm font-medium text-gray-400">Số điện thoại:</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="w-full mt-2 border outline-none border-gray-300 rounded-lg px-3 py-1 text-gray-500" />
              </div>
              <div>
                <div className="flex items-center">
                  <label htmlFor="address" className="text-sm font-medium text-gray-400 ">
                    Địa chỉ
                  </label>
                  <button onClick={handleGetLocation} className="ms-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </button>
                </div>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full mt-2 border border-gray-300 rounded-lg p-3 text-gray-500" rows={2} />
              </div>
              {token ? (
                <button disabled={isLoading} onClick={handleSubmit} className=" w-full bg-primary text-gray1 font-medium py-3 px-4 rounded text-base">
                  {isLoading ? <ButtonLoading /> : "Đặt hàng"}
                </button>
              ) : (
                <button className=" w-full bg-primary text-gray1 font-medium py-3 px-4 rounded text-base">Đăng nhập để đặt hàng</button>
              )}
            </>
          )}
        </div>
        {/* {items.length > 0 && (
        <div className="p-5">
          <button className="w-full bg-red-500 text-gray1 py-2 rounded" onClick={() => dispatch(clearCart())}>
            Xóa giỏ hàng
          </button>
        </div>
      )} */}
      </div>
    </>

  );
};

export default Cart;
