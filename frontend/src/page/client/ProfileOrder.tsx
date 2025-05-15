import { useEffect, useState } from "react";
import { IOrder } from "../../types/Order";
import axios from "axios";
import { SERVER_HOST } from "../../config/Url";
import moment from "moment"; // dùng để format ngày
import SnipperLoading from "../../components/admin/SnipperLoading";
import { urlList } from "../../util/Format";
import ReviewModel from "../../components/client/ReviewModel";
const status = {
  PENDING: "Chờ xác nhận",
  PREPARING: "Đang chuẩn bị",
  DELIVERING: "Đang giao",
  DELIVERED: "Đã giao",
};

const tabs = [
  { id: "PENDING", lable: "Chờ xác nhận" },
  { id: "PREPARING", lable: "Đang chuẩn bị" },
  { id: "DELIVERING", lable: "Đang giao" },
  { id: "DELIVERED", lable: "Đã giao" },
];
const ProfileOrder = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleSetActive = (id: string) => {
    setActiveTab(id);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${SERVER_HOST}/orders/by-me?size=10&page=${pageCurrent - 1}&status=${activeTab}`);
        const newOrders: IOrder[] = response.data.data.content;

        setOrders((prev) => (pageCurrent === 1 ? newOrders : [...prev, ...newOrders]));
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageCurrent, activeTab]);

  // Gom nhóm theo ngày
  const groupedOrders = orders.reduce((groups: Record<string, IOrder[]>, order) => {
    const date = moment(order.createdAt).format("YYYY-MM-DD");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(order);
    return groups;
  }, {});

  return (
    <div className="custom-container py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Lịch sử đơn hàng</h2>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {tabs.map((tab) => (
            <li key={tab.id} className="me-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg transition-colors ${activeTab === tab.id
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
      <div className="space-y-10">
        {Object.entries(groupedOrders).map(([date, orders]) => (
          <div key={date}>
            <h3 className="text-xl font-bold text-gray-700 mb-4">{moment(date).format("DD/MM/YYYY")}</h3>
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg shadow-sm p-4 bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm text-gray-500">Mã đơn: #{order.id}</p>
                      <p className="text-sm text-gray-500">Giờ đặt: {moment(order.createdAt).format("HH:mm:ss")}</p>
                    </div>

                    <p className="text-sm font-medium text-green-500">{status[order.status as keyof typeof status]}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {order.orderDetails.map((detail) => (
                      <div key={detail.id} className="flex items-center gap-4">
                        <img src={urlList(detail.product.image)} alt={detail.product.name} className="w-16 h-16 rounded object-cover" />
                        <div>
                          <p className="font-semibold text-gray-800">{detail.product.name}</p>
                          <p className="text-sm text-gray-500">SL: {detail.quantity}</p>
                          {/* {detail.message && <p className="text-sm text-gray-400 italic">"{detail.message}"</p>} */}
                          <p className="text-sm text-gray-600">{detail.price.toLocaleString()}đ</p>
                          {order.status === "DELIVERED" && <button
                            className="text-xs text-blue-500"
                            onClick={() => {
                              setSelectedProductName(detail.product.name); // Có thể lưu ID hoặc object nếu cần
                              setOpenReviewModal(true);
                              setSelectedProductId(detail.product.id)
                            }}
                          >
                            Đánh giá món ăn
                          </button>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-right font-semibold text-gray-700">Tổng tiền: {order.totalPrice.toLocaleString()}đ</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {openReviewModal && (
          <ReviewModel
            setOpenModal={setOpenReviewModal}
            productName={selectedProductName}
            productId={selectedProductId}
          />
        )}
      </div>
      {isLoading && <SnipperLoading />}
      {totalPages !== null && totalPages > 0 && pageCurrent < totalPages && (
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={() => setPageCurrent((pre) => pre + 1)}
            disabled={isLoading}
            className="mt-3 gap-2 border border-1 border-primary text-gray1 font-medium py-2 px-4 rounded text-base"
          >
            Xem thêm
          </button>
        </div>
      )}
      {!isLoading && orders.length === 0 && totalPages === 0 && <p className="text-center text-gray-500 mt-5">Không có đơn hàng nào</p>}{" "}
    </div>
  );
};

export default ProfileOrder;
