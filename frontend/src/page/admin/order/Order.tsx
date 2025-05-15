import { useEffect, useState } from "react";
import SnipperLoading from "../../../components/admin/SnipperLoading";
import axios from "axios";
import { SERVER_HOST } from "../../../config/Url";
import { IOrder } from "../../../types/Order";
import ItemOrder from "./ItemOrder";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { removeOrder, removeOrderById } from "../../../redux/orderSlice";
import Pagination from "../../../components/admin/Pagination";

const tabs = [
  { id: "PENDING", lable: "Chờ xác nhận" },
  { id: "PREPARING", lable: "Đang chuẩn bị" },
  { id: "DELIVERING", lable: "Đang giao" },
  { id: "DELIVERED", lable: "Đã giao" },
];
const Order = () => {
  const dispatch = useDispatch();
  const [pageCurrent, setPageCurrent] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [oders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { items } = useSelector((state: RootState) => state.order);
  const handleSetActive = (id: string) => {
    setActiveTab(id);
  };
  const newOrder = (order: IOrder, method: string) => {
    if (method === "normal") setOrders(oders.filter((o) => o.id != order.id));
    else dispatch(removeOrderById(order));
  };
  useEffect(() => {
    const fetchData = async () => {
      if (activeTab == "PENDING") dispatch(removeOrder());
      setIsLoading(true);
      try {
        const response = await axios.get(`${SERVER_HOST}/orders?status=${activeTab}&sort=id,desc&page=${pageCurrent - 1}`);
        setOrders(response.data.data.content);
        console.log(response);
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [activeTab,pageCurrent]);
  return (
    <div>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              {tabs.map((tab) => (
                <li key={tab.id} className="me-2" role="presentation">
                  <button
                    className={`inline-block p-4 border-b-2 rounded-t-lg transition-colors ${
                      activeTab === tab.id
                        ? "text-purple-600 border-purple-600 dark:text-purple-500 dark:border-purple-500"
                        : "text-gray-500 hover:text-gray-600 border-transparent hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                    onClick={() => handleSetActive(tab.id)}
                    type="button"
                  >
                    {tab.lable}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="p-4 w-[2rem] text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      <div className="flex items-cnter">STT</div>
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Thông tin người đặt
                    </th>

                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Chi tiết đơn hàng
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Tổng tiền
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Giờ đặt
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {activeTab === "PENDING" && items.map((order, index) => <ItemOrder key={order.id} method="redux" order={order} stt={index + 1} newOrder={newOrder} />)}
                  {isLoading ? (
                    <tr>
                      <td colSpan={100} className="text-center py-4">
                        <SnipperLoading />
                      </td>
                    </tr>
                  ) : (
                    oders.length > 0?
                    oders?.map((order, index) => <ItemOrder key={order.id} order={order} method="normal" stt={activeTab === "PENDING" ? items.length + index + 1 : index + 1} newOrder={newOrder} />):(
                      <tr>
                        <td colSpan={100} className="text-center py-4 text-gray-500">
                          Không có đơn hàng nào.
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              {totalPages!=null && totalPages > 0 && (
                <Pagination pageCurrent={pageCurrent} setPageCurrent={setPageCurrent} totalPages={totalPages} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
