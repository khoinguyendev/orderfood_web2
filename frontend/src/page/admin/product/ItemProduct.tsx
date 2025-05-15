import { Link } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import ButtonLoading from "../../../components/admin/ButtonLoading";
import { formatCurrency,  urlList } from "../../../util/Format";
import { IProduct } from "../../../types/Product";
import { SERVER_HOST } from "../../../config/Url";

interface ItemProductProps {
  product: IProduct;
  handleSelectItem: (id: number) => void;
  setLoad: any;
  selectedIds: number[];
  stt: number;
}

const ItemProduct = ({ product, stt, handleSelectItem, selectedIds, setLoad }: ItemProductProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.delete(`${SERVER_HOST}/products/${id}`);
      toast.success("Đã xóa");
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
            checked={selectedIds.includes(product.id)}
            onChange={() => handleSelectItem(product.id)}
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
      <td className="text-base font-semibold text-gray-900 dark:text-white">{product.name}</td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={product.image && urlList(product.image)} alt="Uploaded" className="w-20 h-20 object-cover rounded" />
      </td>

      <td className="text-base font-semibold text-gray-900 dark:text-white">{formatCurrency(product.price)}</td>

      <td className="text-base font-semibold text-gray-900 dark:text-white">{product.category.name}</td>
      <td className="text-base font-semibold text-gray-900 dark:text-white">{product.available ? "Có" : "Không"}</td>

      <td className="p-4 space-x-2 whitespace-nowrap">
        <Link
          to={`/admin/crud/edit/products/${product.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-blue-800"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
          </svg>
        </Link>
        <button
          onClick={() => handleDelete(product.id)}
          type="button"
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

export default ItemProduct;
