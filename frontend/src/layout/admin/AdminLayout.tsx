import { Outlet } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import HeaderAdmin from "./HeaderAdmin";
import SlideBar from "./SlideBar";
import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
import { neworder } from "../../redux/orderSlice";
import { IOrder } from "../../types/Order";
import { toast } from "react-toastify";
import { SERVER_HOST } from "../../config/Url";
const AdminLayout = () => {
  const dispatch = useDispatch();

 useEffect(() => {
  let client: Client;

  const connectWebSocket = () => {
    const socket = new SockJS(`${SERVER_HOST}/ws`);
    client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log("STOMP Debug:", str),
      onConnect: () => {
        client.subscribe("/admin/order", (message) => {
          const newOrder: IOrder = JSON.parse(message.body);
          toast.info("Bạn có đơn hàng mới!");
          dispatch(neworder(newOrder));
        });
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame.headers["message"]);
      },
    });

    client.activate();
  };

  connectWebSocket();

  return () => {
    if (client) {
      client.deactivate();
    }
  };
}, []);

  return (
    <div>
      <HeaderAdmin />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <SlideBar />
        <div className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
          <div className="main">
            <div className="px-4 pt-6">
              <Outlet />
            </div>
          </div>
          <FooterAdmin />
          <p className="my-10 text-sm text-center text-gray-500">
            © 2019-2025{" "}
            <a href="https://flowbite.com/" className="hover:underline" target="_blank">
              khoinguyen dev
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
