import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { SERVER_HOST } from "../../../config/Url";
import ButtonLoading from "../../../components/admin/ButtonLoading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICategory } from "../../../types/Category";
import SnipperLoading from "../../../components/admin/SnipperLoading";
import toast from "react-hot-toast";
import ImageUploaderNew from "../../../components/admin/ImageUploaderNew";

// ✅ Sửa lại schema validation (chỉ một ảnh)
const productSchema = z.object({
  name: z.string().min(3, "Tên danh mục phải có ít nhất 3 ký tự"),
});

type ProductFormValues = z.infer<typeof productSchema>;

const EditCategoryNew = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
    },
  });
  // const [categories, setCategories] = useState<ICategory>();
  const [openModal, setOpenModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responseCategory = await axios.get(`${SERVER_HOST}/categories/${id}`);
        const categoryData: ICategory = responseCategory.data.data;
        setImageUrl(categoryData.image);
        // setCategories(categoryData);

        // Đặt giá trị mặc định cho form
        reset({
          name: categoryData.name || "",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
  //   const onSubmit = async (data: ProductFormValues) => {
  //     // Chuyển dữ liệu thành FormData
  //     const formData = new FormData();
  //     const category = {
  //       name: data.name,
  //     };
  //     formData.append("category", new Blob([JSON.stringify(category)], { type: "application/json" }));
  //     formData.append("name", data.name);
  //     if (data.image) formData.append("image", data.image);
  //     try {
  //       const response = await axios.put(`${SERVER_HOST}/categories/${id}`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       toast.success("Sửa thành công");
  //       console.log("Phản hồi từ server:", response.data);
  //     } catch (error) {
  //       console.error("Lỗi khi gửi sản phẩm:", error);
  //     }
  //   };

  const onSubmit = async (data: ProductFormValues) => {
    if (!imageUrl) toast.error("Vui lòng chọn ảnh");
    const category = {
      name: data.name,
      image: imageUrl,
    };
    try {
      const response = await axios.put(`${SERVER_HOST}/categories/new/${id}`, category);

      console.log("Phản hồi từ server:", response.data);
      toast.success("Thêm thành công");
    } catch (error) {
      console.error("Lỗi k:", error);
    }
  };
  if (isLoading) return <SnipperLoading />;
  return (
    <div className="p-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sửa danh mục</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 mt-4">
        <div>
          {/* Tên sản phẩm */}
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
            <input {...register("name")} className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white" placeholder="Nhập tên sản phẩm" />
            {errors.name && <p className="text-red text-sm mt-1">{errors.name.message}</p>}
          </div>
          {/* Tên sản phẩm */}

          {/* Nút submit */}
          <div className="flex gap-4 my-4">
            <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              {isSubmitting ? <ButtonLoading /> : "Lưu"}
            </button>
          </div>
        </div>

        {/* Ảnh sản phẩm */}
        <div>
          <button
            onClick={() => setOpenModal(true)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Chọn ảnh
          </button>
          {imageUrl && (
            <div className="relative w-20 my-3">
              <img src={imageUrl} alt="Uploaded" className="w-20 h-20 object-cover rounded" />
              <button type="button" className="absolute top-0 right-0 bg-red text-white text-xs rounded-full p-1" onClick={() => setImageUrl("")}>
                X
              </button>
            </div>
          )}
        </div>
      </form>
      {openModal && <ImageUploaderNew setOpenModal={setOpenModal} setImageUrl={setImageUrl} />}
    </div>
  );
};

export default EditCategoryNew;
