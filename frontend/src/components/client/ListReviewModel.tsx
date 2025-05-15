import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_HOST } from "../../config/Url";
import { IReview } from "../../types/Review";
import moment from "moment";

interface ReviewModelProps {
    productId: number;
    productName: string;
    setOpenModal: (value: boolean) => void;
}

const ListReviewModal = ({ productId, setOpenModal, productName }: ReviewModelProps) => {
    const [pageCurrent, setPageCurrent] = useState(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchReviews = async (page: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${SERVER_HOST}/reviews/reviews-by-product/${productId}?page=${page - 1}`
            );
            const data = response.data.data;
            setReviews((prev) => [...prev, ...data.content]);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Lỗi khi tải đánh giá:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Khi mở modal, reset về page 1
        setReviews([]);
        setPageCurrent(1);
        fetchReviews(1);
    }, [productId]);

    const handleLoadMore = () => {
        const nextPage = pageCurrent + 1;
        setPageCurrent(nextPage);
        fetchReviews(nextPage);
    };
    useEffect(() => {
        // Khi mở modal: chặn scroll
        document.body.classList.add("overflow-hidden");

        // Khi unmount (đóng modal): cho scroll lại
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[800px] max-w-full rounded-lg shadow-lg relative mx-2">
                <button
                    onClick={() => setOpenModal(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✖
                </button>

                <div className="px-6 py-5 h-[80vh] overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-4">Đánh giá sản phẩm: {productName}</h2>

                    {reviews.length === 0 && !isLoading ? (
                        <p className="text-sm text-gray-500 text-center">Chưa có đánh giá nào.</p>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="border-b pb-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium">{review.user.email}</span>
                                        <span className="text-sm text-gray-400">
                                            {moment(review.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                                        </span>
                                    </div>
                                    <div className="text-yellow-500 text-sm">
                                        {"★".repeat(review.rating)}
                                        {"☆".repeat(5 - review.rating)}
                                    </div>
                                    <p className="text-sm text-gray-700 mt-1">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Nút "Xem thêm" */}
                    {pageCurrent < (totalPages || 0) && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={handleLoadMore}
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? "Đang tải..." : "Xem thêm"}
                            </button>
                        </div>
                    )}
                </div>
                <p className="text-sm text-primary text-center mt-6">
  Vui lòng vào đơn hàng đã hoàn thành để đánh giá món ăn.
</p>
            </div>
        </div>
    );
};

export default ListReviewModal;
