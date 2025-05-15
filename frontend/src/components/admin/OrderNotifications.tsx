import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const OrderNotifications = () => {
  useEffect(() => {
    const connectWebSocket = async () => {
      const socket = new SockJS("http://localhost:8080/ws");
      const client = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log("STOMP Debug:", str),
        onConnect: () => {
          console.log("Connected to WebSocket");
          client.subscribe("/admin/order", (message) => {
            console.log("Received message:", message.body);
            const newOrder = JSON.parse(message.body);
            alert(`Có đơn hàng mới! ID: ${newOrder.id}`);
          });
        },
        onStompError: (frame) => {
          console.error("STOMP Error:", frame.headers["message"]);
        },
      });

      client.activate();

      return () => {
        client.deactivate();
      };
    };

    connectWebSocket();
  }, []);

  return <h2>Admin Dashboard - Đang nghe đơn hàng mới...</h2>;
};

export default OrderNotifications;
