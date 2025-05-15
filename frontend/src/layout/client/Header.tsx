import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import LoginModel from "../../components/client/LoginModel";
import RegisterModel from "../../components/client/RegisterModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearCart, openCart } from "../../redux/cartSlice";
import { ICategory } from "../../types/Category";
import { SERVER_HOST } from "../../config/Url";
import axios from "axios";
import { logout } from "../../redux/authSlice";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";
import logo from "../../assets/logo.jpg";

import FilterCompoent from "../../components/client/FilterCompoent";
import { Link, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { IOrder } from "../../types/Order";
import { toast } from "react-toastify";

const bg = [bg1, bg2, bg3, bg4];

const Header = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!user) {
      // Nếu đã có client thì ngắt kết nối khi user logout
      if (clientRef.current && clientRef.current.active) {
        clientRef.current.deactivate();
        console.log("Disconnected from WebSocket");
      }
      return;
    }

    const socket = new SockJS(`${SERVER_HOST}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log("STOMP Debug:", str),
      onConnect: () => {
        console.log("Connected to WebSocket");
        client.subscribe("/client/order", (message) => {
          const newOrder: IOrder = JSON.parse(message.body);
          if (newOrder.user.email != user.email) return;
          console.log(newOrder);
          if (newOrder.status === "PREPARING") {
            toast.info(`Đơn hàng #${newOrder.id} của bạn đang được chuẩn bị!`);
          } else if (newOrder.status === "DELIVERING") {
            toast.info(`Đơn hàng #${newOrder.id} của bạn đang được giao!`);
          } else if (newOrder.status === "DELIVERED") {
            toast.info(`Đơn hàng #${newOrder.id} của bạn đã được giao!`);
          }
        });
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame.headers["message"]);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (client && client.active) {
        client.deactivate();
        console.log("WebSocket connection cleaned up");
      }
    };
  }, [user]);
  const [search, setSearch] = useState("");
  const [isFixed, setIsFixed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Background image chọn ngẫu nhiên
  const randomBg = useMemo(() => bg[Math.floor(Math.random() * bg.length)], []);

  // Cập nhật trạng thái isFixed khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${SERVER_HOST}/categories`);
        setCategories(response.data.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  // Logout function with useCallback
  const handleLogout = useCallback(async () => {
    try {
      await axios.post(`${SERVER_HOST}/auth/logout`);
      // Xóa token và các thông tin liên quan
      localStorage.removeItem("token");
      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

        const paths = ["/", "/auth", "/api"];
        paths.forEach((path) => {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
        });
      });
      sessionStorage.clear();
      dispatch(clearCart());
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("token");
      dispatch(logout());
    }
  }, [dispatch]);
  const handleSearch = async () => {
    if (!search.trim()) return;

    setTimeout(() => {
      navigate(`/bo-loc-san-pham?keyword=${search}`);
    }, 300); // Delay nhỏ để tránh giật lag
  };
  return (
    <>
      <div style={{ backgroundImage: `url(${randomBg})` }} className="h-[250px] md:h-[400px] bg-no-repeat bg-cover">
        <div className={`transition-all duration-300 ${isFixed ? "fixed top-0 left-0 w-full bg-white shadow-md z-30" : "relative"}`}>
          <div className="px-5 xl:px-0 lg:w-[1200px] mx-auto flex items-center flex-wrap gap-5 justify-between py-2">
            <Link to={"/"} className="hidden md:block">
              <img src={logo} className="w-[100px] h-[100px] rounded-full" />
            </Link>
            <div className="flex flex-wrap justify-end gap-5 items-center">
              {/* Tìm kiếm */}
              <Link to={"/"} className="block md:hidden">
                <img src={logo} className="w-[100px] h-[100px] rounded-full" />
              </Link>
              <div className="relative order-2 w-full md:mx-4 md:w-[400px] md:order-none">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Tìm món ăn..."
                  className="w-full px-4 py-2 border border-primary rounded-md text-sm outline-none text-gray-400"
                />
                <svg
                  onClick={handleSearch}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="cursor-pointer box-content p-2 size-7 absolute right-0 top-1/2 transform -translate-y-1/2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>

              {/* Bộ lọc */}
              <FilterCompoent categories={categories} />
              {/* Nút giỏ hàng */}
              <button onClick={() => dispatch(openCart())} className="bg-white rounded-full w-10 h-10 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </button>

              {/* Đăng nhập / Đăng xuất */}
              {token ? (
                <div>
                  <button onClick={() => navigate("/thong-tin-cua-toi")} className="bg-primary text-sm rounded-full h-10 w-10 font-medium">
                    {user?.email.slice(0, 1).toUpperCase()}
                  </button>
                  <button onClick={handleLogout} className="ml-2 text-sm font-medium text-gray-500">
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div>
                  <button className="bg-primary text-sm rounded px-5 py-3 font-medium" onClick={() => setOpenModal(true)}>
                    Đăng nhập/Đăng kí
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal đăng nhập / đăng ký */}
      {openModal && (isLogin ? <LoginModel setOpenModal={setOpenModal} setIsLogin={setIsLogin} /> : <RegisterModel setOpenModal={setOpenModal} setIsLogin={setIsLogin} />)}
    </>
  );
};

export default Header;
