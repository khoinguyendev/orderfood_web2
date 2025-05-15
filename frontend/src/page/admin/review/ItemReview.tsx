import { formatDate } from "../../../util/Format";
import { useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../../../config/Url";
import toast from "react-hot-toast";
import ButtonLoading from "../../../components/admin/ButtonLoading";
import { IReview } from "../../../types/Review";
interface ItemReviewProps {
  review: IReview;
  stt: number;
  setLoad: any
}
const ItemReview = ({ review, stt, setLoad }: ItemReviewProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.delete(`${SERVER_HOST}/reviews/${id}`);
      toast.success("Đã xóa");
      setLoad((pre: any) => !pre);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDuyet = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.put(`${SERVER_HOST}/reviews/${id}`, { published: true,rating:review.rating });
      toast.success("Đã duyệt");
      setLoad((pre: any) => !pre);
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
      <td className="text-base font-semibold text-gray-900 dark:text-white">{review.user.email}</td>

      <td className="text-base font-semibold text-gray-900 dark:text-white">{review.rating}</td>
      <td className="text-base font-semibold text-gray-900 dark:text-white">{review.comment}</td>
      <td className="text-base font-semibold text-gray-900 dark:text-white">{review.product.name}</td>
      <td className="text-base font-semibold text-gray-900 dark:text-white">{review.published ? "Rồi" : "Chưa"}</td>

      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">{formatDate(review.createdAt)}</td>
      <td className="p-4 space-x-2 whitespace-nowrap">
       {!review.published&& <button
          type="button"
          onClick={() => handleDuyet(review.id)}

          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#c81e1e] rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
        >
          Duyệt
        </button>}
        <button
          type="button"
          onClick={() => handleDelete(review.id)}

          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#c81e1e] rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
        >
          {isLoading ? (
            <ButtonLoading />
          ) : (
            <svg className="w-4 h-4 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </td>
    </tr>
  );
};

export default ItemReview;
