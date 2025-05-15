import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formatCurrency } from "../../../util/Format";
import axios from "axios";
import { SERVER_HOST } from "../../../config/Url";
import { useEffect, useState } from "react";
import { ICategory } from "../../../types/Category";
import toast from "react-hot-toast";
import ImageUploader from "../../../components/admin/ImageUploader";

// ✅ Định nghĩa schema validation bằng Zod
const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Tên sản phẩm phải có ít nhất 3 ký tự")
    .transform((val) => val.replace(/\s+/g, " ")),
  description: z.string().optional(), // Không bắt buộc nhập
  price: z.number({ invalid_type_error: "Giá phải là số" }).min(1000, "Giá phải lớn hơn 1.000").max(100000000, "Giá phải lớn hơn 100.000.000"),
  image: z.instanceof(File, { message: "Vui lòng chọn 1 ảnh" }),
  categoryId: z.number().positive("Vui lòng chọn 1 danh mục"),
  available: z.string(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: 0,
      available: "false",
      image: undefined,
    },
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(false); // ✅ Thêm state resetTrigger
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responseCategory = await axios.get(`${SERVER_HOST}/categories`);
        const categoryData = responseCategory.data.data.content;
        setCategories(categoryData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const onSubmit = async (data: ProductFormValues) => {
    // Chuyển dữ liệu thành FormData
    const formData = new FormData();
    const product = {
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
      description: data.description,
      available: data.available == "true" ? true : false,
    };
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    formData.append("file", data.image);

    try {
      const response = await axios.post(`${SERVER_HOST}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Phản hồi từ server:", response.data);
      reset();
      setResetTrigger((pre) => !pre);
      toast.success("Thêm thành công");
    } catch (error: any) {
      console.error("Lỗi khi gửi sản phẩm:", error);
      if (error.response.data.statusCode === 409) toast.error("Tên đã tồn tại");
      else toast.error("Internal server error");
    }
  };

  const price = watch("price");

  return (
    <div className="p-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Thêm sản phẩm</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 mt-4">
        <div>
          {/* Tên sản phẩm */}
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
            <input {...register("name")} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" placeholder="Nhập tên sản phẩm" />
            {errors.name && <p className="text-red text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Giá sản phẩm */}
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá</label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
              placeholder="Nhập giá"
            />
            {errors.price && <p className="text-red text-sm mt-1">{errors.price.message}</p>}
            {price > 0 && <p className="text-green-600 text-sm mt-1">{formatCurrency(price)}</p>}
          </div>
          <div className="mb-2">
            <label htmlFor="category-create" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Danh mục
            </label>
            <select
              defaultValue={0}
              id="category-create"
              {...register("categoryId", { valueAsNumber: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value={0}>Chọn danh mục</option>
              {!isLoading &&
                categories?.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
            </select>
            {errors.categoryId && <p className="text-red text-sm mt-1">{errors.categoryId.message}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mô tả
            </label>
            <textarea
              {...register("description")}
              id="description"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="category-create" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Xuất bản
            </label>
            <select
              defaultValue="false"
              {...register("available")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="false">Không xuất bản</option>
              <option value="true">Xuất bản</option>
            </select>
            {errors.available && <p className="text-red text-sm mt-1">{errors.available.message}</p>}
          </div>
          {/* Nút submit */}
          <div className="flex gap-4 my-4">
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Thêm sản phẩm
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
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ảnh sản phẩm</label>
          <ImageUploader setValue={setValue} resetTrigger={resetTrigger} />
          {errors.image && <p className="text-red text-sm mt-1">{errors.image.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
