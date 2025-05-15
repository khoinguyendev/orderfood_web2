import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { SERVER_HOST } from "../../../config/Url";
import ButtonLoading from "../../../components/admin/ButtonLoading";
import toast from "react-hot-toast";

// ✅ Sửa lại schema validation (chỉ một ảnh)
const brandSchema = z.object({
  name: z.string().min(3, "Tên danh mục phải có ít nhất 3 ký tự").max(50, "Tên danh mục phải không quá 50 ký tự"),
});

type BrandFormValues = z.infer<typeof brandSchema>;

const AddBrand = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data: BrandFormValues) => {
    // Chuyển dữ liệu thành FormData

    try {
      const response = await axios.post(`${SERVER_HOST}/brand`, data);

      console.log("Phản hồi từ server:", response.data);
      toast.success("Thêm thành công");
      reset();
    } catch (error: any) {
      if (error.response.data.statusCode === 409) toast.error("Tên đã tồn tại");
      else toast.error("Internal server error");
    }
  };

  return (
    <div className="p-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Thêm thương hiệu</h3>

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
              }}
              type="reset"
              className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Hủy
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBrand;
