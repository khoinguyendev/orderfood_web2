import { SERVER_HOST } from "../../../config/Url";
import { formatCurrency, formatDate,  urlList } from "../../../util/Format";
import { IOrder } from "../../../types/Order";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonLoading from "../../../components/admin/ButtonLoading";
interface ItemOrderProps {
  order: IOrder;
  stt: number;
  method: string;
  newOrder: (order: IOrder, method: string) => void;
}
const status = {
  PENDING: "Xác nhận",
  PREPARING: "Giao hàng",
  DELIVERING: "Đã giao",
  DELIVERED: "Hoàn thành",
};
const ItemOrder = ({ order, stt, newOrder, method }: ItemOrderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = async (id: number, status: string) => {
    if (status === "PENDING") {
      status = "PREPARING";
    } else if (status === "PREPARING") {
      status = "DELIVERING";
    } else if (status === "DELIVERING") {
      status = "DELIVERED";
    } else {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.put(`${SERVER_HOST}/orders/${id}`, {
        status: status,
      });
      newOrder(response.data.data, method);
      toast.success("Đã xác nhận đơn hàng");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-194556"
            aria-describedby="checkbox-1"
            type="checkbox"
            className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="checkbox-194556" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
        <div className="text-base font-semibold text-gray-900 dark:text-white">{stt}</div>
      </td>
      <td className="text-base  text-gray-900 dark:text-white">
        <ul id="dropdown-crud" className={`space-y-2 py-2`}>
          <li>
            Tên: <span className="font-semibold">{order.user.email}</span>
          </li>
          <li>
            SĐT: <span className="font-semibold">{order.phone}</span>
          </li>
          <li>
            Địa chỉ: <span className="font-semibold text-sm">{order.address}</span>
          </li>
        </ul>
      </td>

      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
        {order.orderDetails.map((orderDetail) => (
          <div className="flex gap-2 mb-2" key={orderDetail.id}>
            <img src={urlList(orderDetail.product.image)} alt="Uploaded" className="w-14 h-14 object-cover rounded" />
            <div className="flex flex-col">
              <span className="font-semibold">{orderDetail.product.name}</span>
              <span className="font-semibold">
                Số lượng: <span className="text-green-500 font-bold">{orderDetail.quantity}</span>
              </span>
              <span className="font-semibold">Lời nhắn: {orderDetail.message}</span>
            </div>
          </div>
        ))}
      </td>
      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">{formatCurrency(order.totalPrice)}</td>
      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">{formatDate(order.createdAt)}</td>
      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
        {order.status != "DELIVERED" && (
          <button
            onClick={() => handleConfirm(order.id, order.status)}
            type="button"
            disabled={isLoading}
            className="me-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg  focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
          >
            {isLoading ? <ButtonLoading /> : status[order.status as keyof typeof status]}
          </button>
        )}
        {order.status === "PENDING" && (
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#c81e1e] rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
          >
            Hủy bỏ
          </button>
        )}
      </td>
    </tr>
  );
};

export default ItemOrder;
