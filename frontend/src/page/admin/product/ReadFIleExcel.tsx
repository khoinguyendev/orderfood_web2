import axios from "axios";
import { useState } from "react";
import * as XLSX from "xlsx";
import { SERVER_HOST } from "../../../config/Url";
import toast from "react-hot-toast";
import ButtonLoading from "../../../components/admin/ButtonLoading";

const ReadFIleExcel = ({ setOpenModal,setLoad }: { setOpenModal: (b: boolean) => void,setLoad:any }) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      const binaryStr = e.target?.result as string;
      const workbook = XLSX.read(binaryStr, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const paddedData = jsonData.map((row: any) => {
        return [...row, null, null, null, null, null].slice(0, 5);
      });
      setData(paddedData);
    };
  };

  const hanldeAdd = async () => {
    const json = data.slice(1).map((i) => {
      return {
        name: i[0],
        description: i[1],
        price: Number(i[2]),
        categoryName: i[3],
        available: true,
        image: i[4].split(',').map((url: string) => url.trim()),
      };
    });

    try {
      setIsLoading(true);
      await axios.post(`${SERVER_HOST}/products/import-excel`, json);
      toast.success("Thêm thành công");
      setLoad((pre:any)=>!pre)
      setOpenModal(false);
    } catch (error: any) {
      console.error("Lỗi khi gửi sản phẩm:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white w-full max-w-[1200px] max-h-[90vh] rounded-lg shadow-lg relative p-5 flex flex-col">
        <button
          disabled={isLoading}
          onClick={() => setOpenModal(false)}
          className="absolute h-10 w-10 rounded-full flex items-center justify-center bg-white -top-5 -right-5 text-gray1 text-xl shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-4" />

        <div className="flex-1 overflow-y-auto border rounded-md">
          {data.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200 table-auto text-sm">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  {data[0].map((key: string, idx:number) => (
                    <th scope="col" className="p-3 text-left" key={idx}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {data.slice(1).map((row, i) => (
  <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200" key={i}>
    {row.map((val: any, j: number) => {
      if (j === 4) {
        const urlArray = val.split(',').map((url: string) => url.trim()).slice(0, 6); // Giới hạn 6 ảnh
        return (
          <td className="p-3 text-center align-middle" key={j}>
            <div className="flex justify-center gap-2 flex-wrap">
              {urlArray.map((url: string, index: number) => (
                <img
                  key={index}
                  src={url}
                  alt={`Image ${i}-${index}`}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
          </td>
        );
      } else {
        return (
          <td className="p-3 text-center align-middle" key={j}>
            {val ?? "--"}
          </td>
        );
      }
    })}
  </tr>
))}
              </tbody>
            </table>
          )}
        </div>

        {data.length > 1 && (
          <button
            onClick={hanldeAdd}
            disabled={isLoading}
            className="mt-4 w-fit self-end text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {isLoading ? <ButtonLoading /> : "Thêm"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReadFIleExcel;
