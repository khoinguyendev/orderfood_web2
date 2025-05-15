import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { SERVER_HOST } from "../../../config/Url";
import ButtonLoading from "../../../components/admin/ButtonLoading";
import toast from "react-hot-toast";

// ✅ Schema validation
const userSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  name: z.string().optional(),

  address: z.string().optional(),
  role: z.enum(["ADMIN", "CUSTOMER"], {
    required_error: "Vui lòng chọn vai trò",
  }),
});

type UserFormValues = z.infer<typeof userSchema>;

const AddUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      address: "",
      role: "CUSTOMER",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      await axios.post(`${SERVER_HOST}/users/create-by-admin`, data);
      toast.success("Thêm người dùng thành công");
      reset();
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="p-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Thêm người dùng</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 mt-4">
        {/* Email */}
        <div className="mb-2 col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            {...register("email")}
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            placeholder="Nhập email"
          />
          {errors.email && <p className="text-red text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-2 col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
          <input
            type="password"
            {...register("password")}
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            placeholder="Nhập mật khẩu"
          />
          {errors.password && <p className="text-red text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Name */}
        <div className="mb-2 col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
          <input
            {...register("name")}
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            placeholder="Nhập tên (không bắt buộc)"
          />
        </div>

        {/* Address */}
        <div className="mb-2 col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
          <input
            {...register("address")}
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            placeholder="Nhập địa chỉ (không bắt buộc)"
          />
        </div>

        {/* Role */}
        <div className="mb-4 col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Vai trò</label>
          <select
            {...register("role")}
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
          >
            <option value="CUSTOMER">Khách hàng</option>
            <option value="ADMIN">Quản trị viên</option>
          </select>
          {errors.role && <p className="text-red text-sm mt-1">{errors.role.message}</p>}
        </div>

        {/* Nút submit */}
        <div className="col-span-2 flex gap-4 mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            {isSubmitting ? <ButtonLoading /> : "Thêm người dùng"}
          </button>
          <button
            onClick={() => reset()}
            type="button"
            className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
