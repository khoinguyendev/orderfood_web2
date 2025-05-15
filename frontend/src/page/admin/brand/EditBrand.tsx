import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { SERVER_HOST } from "../../../config/Url";
import ButtonLoading from "../../../components/admin/ButtonLoading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SnipperLoading from "../../../components/admin/SnipperLoading";
import toast from "react-hot-toast";

// ✅ Sửa lại schema validation (chỉ một ảnh)
const brandSchema = z.object({
  name: z.string().min(3, "Tên danh mục phải có ít nhất 3 ký tự").max(50, "Tên danh mục phải không quá 50 ký tự").trim(),
});

type BrandFormValues = z.infer<typeof brandSchema>;

const EditBrand = () => {
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
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${SERVER_HOST}/brand/${id}`);
        const branData = response.data.data;
        reset({
          name: branData.name || "",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const onSubmit = async (data: BrandFormValues) => {
    try {
      const response = await axios.patch(`${SERVER_HOST}/brand/${id}`, data);
      toast.success("Sửa thành công");
      console.log("Phản hồi từ server:", response.data);
    } catch (error: any) {
      if (error.response.data.statusCode === 409) toast.error("Tên đã tồn tại");
      else toast.error("Internal server error");
    }
  };
  if (isLoading) return <SnipperLoading />;
  return (
    <div className="p-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sửa thương hiệu</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 mt-4">
        <div>
          {/* Tên sản phẩm */}
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
            <input {...register("name")} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" />
            {errors.name && <p className="text-red text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Nút submit */}
          <div className="flex gap-4 my-4">
            <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              {isSubmitting ? <ButtonLoading /> : "Lưu"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBrand;
