import { useState } from "react";
import ListImageModal from "./ListImageModal";
import { IImage } from "../../../types/Image";

const ItemCategoryExcel = ({ row, handleData, images, position, handleDlt, index }: { index: number; row: any; handleData: any; images: IImage[]; position: number; handleDlt: any }) => {
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(() => row[1]);
  const [value, setValue] = useState(() => row[0]);
  const handleBlur = () => {
    // Gọi hàm xử lý (ví dụ: cập nhật dữ liệu hoặc gọi API)
    handleData(position, value, "name"); // Gửi dữ liệu về cha nếu cần
  };

  const render = (i: number, val: string) => {
    switch (i) {
      case 0:
        return (
          <td className="px-6 py-4" key={i}>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </td>
        );
      case 1:
        return (
          <td key={i} className="flex gap-4 px-6 py-4">
            <img className="h-40 w-40 object-cover" src={imageUrl} />
            <div>
              <button
                onClick={() => setOpenModal(true)}
                className="block text-white bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Chọn ảnh
              </button>
            </div>
            {openModal && <ListImageModal setOpenModal={setOpenModal} handleChange={handleChange} images={images} />}
          </td>
        );
      default:
        return <td key={i}>{val}</td>;
    }
  };

  const handleChange = (newImageUrl: string) => {
    handleData(position, newImageUrl, "img"); // Cập nhật ảnh
    setImageUrl(newImageUrl); // Cập nhật ảnh hiển thị
  };

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
      <td>{index + 1}</td>
      {row.map((val: any, j: number) => render(j, val))}
      <td>
        <button onClick={() => handleDlt(position)}>Xóa</button>
      </td>
    </tr>
  );
};

export default ItemCategoryExcel;
