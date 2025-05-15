import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { SERVER_HOST } from "../../../config/Url";
import ImageUploader from "../../../components/admin/ImageUploader";
import ButtonLoading from "../../../components/admin/ButtonLoading";
import { useState } from "react";

// ✅ Sửa lại schema validation (chỉ một ảnh)
const productSchema = z.object({
  name: z.string().min(3, "Tên danh mục phải có ít nhất 3 ký tự"),
  image: z.instanceof(File, { message: "Vui lòng chọn 1 ảnh" }),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });
  const [resetTrigger, setResetTrigger] = useState(false); // ✅ Thêm state resetTrigger
  const onSubmit = async (data: ProductFormValues) => {
    // Chuyển dữ liệu thành FormData
    const formData = new FormData();
    const category = {
      name: data.name,
    };
    formData.append("category", new Blob([JSON.stringify(category)], { type: "application/json" }));
    formData.append("file", data.image);
    try {
      const response = await axios.post(`${SERVER_HOST}/categories`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Phản hồi từ server:", response.data);
      reset();
      setResetTrigger((prev) => !prev);
    } catch (error) {
      console.error("Lỗi khi gửi sản phẩm:", error);
    }
  };

  return (
    <div className="p-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Thêm danh mục</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 mt-4">
        <div>
          {/* Tên sản phẩm */}
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
            <input {...register("name")} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" placeholder="Nhập tên sản phẩm" />
            {errors.name && <p className="text-red text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Nút submit */}
          <div className="flex gap-4 my-4">
            <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              {isSubmitting ? <ButtonLoading /> : "Thêm danh mục"}
            </button>
            <button
              onClick={() => {
                reset();
                setResetTrigger((prev) => !prev);
              }}
              type="reset"
              className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Hủy
            </button>
          </div>
        </div>

        {/* Ảnh sản phẩm */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ảnh</label>
          <ImageUploader setValue={setValue} resetTrigger={resetTrigger} />
          {errors.image && <p className="text-red text-sm mt-1">{errors.image.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
