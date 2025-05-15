import { IProduct } from "../../../types/Product";
import * as XLSX from "xlsx";

const ExportExcel = ({ data }: { data: IProduct[] }) => {
  const exportToExcel = (fileName = "Danh_sach.xlsx") => {
    const dulieu = data.map((i) => ({
      Tên: i.name,
      Giá:i.price,
      "Mô tả":i.description,
      "Ảnh":JSON.parse(i.image).join(","),
      "Danh mục": i.category?.name || "Không có",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dulieu);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách");
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <button
      onClick={() => exportToExcel()}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
      Xuất Excel
    </button>
  );
};

export default ExportExcel;
