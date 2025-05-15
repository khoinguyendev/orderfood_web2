import axios from "axios";
import { IImage } from "../../../types/Image";
import toast from "react-hot-toast";
import { SERVER_HOST } from "../../../config/Url";
import { useState } from "react";
import ButtonLoading from "../../../components/admin/ButtonLoading";
interface ItemImageProps {
  image: IImage;
  stt: number;
  deleteImage: () => void;
}
const ItemImage = ({ image, stt, deleteImage }: ItemImageProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`${SERVER_HOST}/files/delete?publicId=${image.publicId}`);

      console.log("Phản hồi từ server:", response.data);
      deleteImage();
      toast.success("Xóa thành công");
    } catch (error) {
      console.error("Lỗi k:", error);
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
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={image.url} alt="Image" className="h-24 object-cover rounded" />
      </td>
      <td>
        <div className="text-base  text-gray-900 dark:text-white">{image.url}</div>
      </td>
      <td>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="text-white bg-red  font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          {isLoading ? <ButtonLoading /> : "Xóa"}
        </button>
      </td>
    </tr>
  );
};

export default ItemImage;
