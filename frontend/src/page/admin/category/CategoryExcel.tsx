import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { SERVER_HOST } from "../../../config/Url";
import ButtonLoading from "../../../components/admin/ButtonLoading";
import ItemCategoryExcel from "./ItemCategoryExcel";
import { IImage } from "../../../types/Image";
import toast from "react-hot-toast";
const CategoryExcel = ({ setOpenModal,setLoad }: { setOpenModal: (b: boolean) => void,setLoad:any }) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${SERVER_HOST}/images`);
        setImages(response.data.data.content);
        console.log("a");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
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
      console.log(jsonData);
      setData(jsonData);
    };
  };
  const handleData = (position: number, value: string, key: string) => {
    if (key == "img") data[position + 1][1] = value;
    else if (key == "name") data[position + 1][0] = value;
    console.log(data);
  };
  const hanldeAdd = async () => {
    console.log(data);
    let name: any[] = [];
    let error = 0;
    data.slice(1).forEach((data: any[], index) => {
      const existName = name.find((n) => n.name == data[0]);
      if (!data[0] || !data[1]) {
        toast.error(`Dòng ${index + 1} không có tên hoặc ảnh.`);
        error++;
        return;
      }
      if (existName) {
        toast.error(`Dòng thứ ${existName.row} và dòng ${index + 1} trùng tên`);
        error++;
        return;
      }
      name.push({ row: index + 1, name: data[0] });
    });
    if (error > 0) return;
    // const json = data.slice(1).map((i) => {
    //   return {
    //     name: i[0],
    //     description: i[1],
    //     price: Number(i[2]),
    //     categoryName: i[3],
    //     available: i[4] === "true" ? true : false,
    //     image: i[4],
    //   };
    // });

    // try {
    //   setIsLoading(true);
    //   const response = await axios.post(`${SERVER_HOST}/products/import-excel`, json);

    //   console.log("Phản hồi từ server:", response.data);
    //   toast.success("Thêm thành công");
    // } catch (error: any) {
    //   console.error("Lỗi khi gửi sản phẩm:", error);
    // } finally {
    //   setIsLoading(false);
    // }
    const json = data.slice(1).map((i) => {
      return {
        name: i[0],
        image: i[1],
      };
    });
    try {
      setIsLoading(true);
      const response = await axios.post(`${SERVER_HOST}/categories/import-excel`, json);

      console.log("Phản hồi từ server:", response.data);
      toast.success("Thêm thành công");
      setLoad((pre:any)=>!pre)
      setOpenModal(false);
    } catch (error: any) {
      console.error("Lỗi khi gửi sản phẩm:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddRow = () => {
    setData((pre) => [...pre, ["", ""]]);
  };
  const handleDlt = (position: number) => {
    setData((prev) => prev.filter((_, index) => index !== position + 1));
  };
  return (
    <div className="fixed inset-0 flex items-center duration-400 justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-[1200px] max-h-[90vh] rounded-lg shadow-lg relative p-5 flex flex-col">
      <button disabled={isLoading} onClick={() => setOpenModal(false)} className="absolute h-10 w-10 rounded-full flex items-center justify-center bg-white -top-5 -right-5 text-gray1 text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <div className="flex-1 overflow-y-auto border rounded-md">
          <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
              <tr>
                {data.length > 0 && (
                  <>
                    <th>STT</th>
                    {data[0].map((key: string) => (
                      <th scope="col" className="p-4" key={key}>
                        {key}
                      </th>
                    ))}
                    <th></th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, i) => (
                <ItemCategoryExcel key={`${row[0]}-${i}`} index={i} handleDlt={handleDlt} row={row} position={i} handleData={handleData} images={images} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between">
          
          {data.length>1&&
          <>
          <button
          onClick={handleAddRow}
          className="block text-white bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          {"Thêm hàng"}
        </button>
          <button
            onClick={hanldeAdd}
            disabled={isLoading}
            className="block text-white bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            {isLoading ? <ButtonLoading /> : "Thêm"}
          </button>
          </>
          }
         
        </div>
      </div>
    </div>
  );
};

export default CategoryExcel;
