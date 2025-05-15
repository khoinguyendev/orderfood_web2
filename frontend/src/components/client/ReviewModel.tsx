import axios from "axios";
import { useState } from "react";
import { SERVER_HOST } from "../../config/Url";
import toast from "react-hot-toast";

const ratingLabels = ["Tệ", "Không hài lòng", "Bình thường", "Hài lòng", "Tuyệt vời"];

const ReviewModel = ({
    setOpenModal,
    productName,
    productId
  }: {
    setOpenModal: any;
    productName: string | null;
    productId:number|null
  }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if(selectedRating==0){
        toast.error("Vui lòng chọn số sao");
        return;
    }
    if(reviewText.length>100){
        toast.error("Đánh giá không vượt quá 100 kí tự");
        return;
    }
    const data={
        rating:selectedRating,
        comment:reviewText,
        productId:productId
    }
    try {
         await axios.post(`${SERVER_HOST}/reviews`, data);
        toast.success("Đánh giá thành công");
        setOpenModal(false);
      } catch (error) {
        console.error("Lỗi k:", error);
      }
  };

  return (
    <div className="fixed inset-0 flex items-center duration-400 justify-center bg-black bg-opacity-50 z-50">
      <form
        className="bg-white w-[600px] rounded-lg shadow-lg relative"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          onClick={() => setOpenModal(false)}
          className="absolute h-10 w-10 rounded-full flex items-center justify-center bg-white -top-5 -right-5 text-gray-500 text-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="py-6 px-6 space-y-5">
        <h2 className="text-xl font-semibold mb-2">Đánh giá món ăn: <span className="text-yellow-500">{productName}</span></h2>

          {/* Star Rating */}
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={
                  (hoverRating ?? selectedRating) >= star ? "#facc15" : "#d1d5db"
                }
                className="w-8 h-8 cursor-pointer transition-all"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                onClick={() => handleStarClick(star)}
              >
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            {(hoverRating ?? selectedRating) > 0 && (
              <span className="ml-4 text-sm text-gray-600">
                {ratingLabels[(hoverRating ?? selectedRating) - 1]}
              </span>
            )}
          </div>

          {/* Text Area */}
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 resize-none"
            rows={4}
            placeholder="Nhập đánh giá của bạn..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewModel;
