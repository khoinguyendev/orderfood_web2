import axios from "axios";
import { useState } from "react";
import { SERVER_HOST } from "../../config/Url";
import { IUser } from "../../types/User";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoading from "../../components/admin/ButtonLoading";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const LoginAdmin = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user) {
    if (user.role == "ADMIN") return <Navigate to="/admin" replace />;
    else return <Navigate to="/" replace />;
  }

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async () => {
    const data = { email, password };
    try {
      setIsLoading(true); // Bật loading
      // Gửi API đăng nhập
      const response = await axios.post(`${SERVER_HOST}/auth/log-in`, data);
      const token: string = response.data.token;
      const user: IUser = response.data.user;
      if (user.role != "ADMIN") {
        alert("Bạn không có quyền truy cập!");
        return;
      }
      dispatch(loginSuccess({ token, user })); // Lưu token vào Redux store
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      localStorage.setItem("token", response.data.token);
      navigate("/admin");
    } catch (error) {
      alert("Tên đăng nhập hoặc mật khẩu không đúng!");
      console.error("Lỗi đăng nhập:", error);
    } finally {
      setIsLoading(false); // Tắt loading
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign in to Admin</h2>

      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
          disabled={isLoading}
          onClick={onSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? <ButtonLoading /> : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default LoginAdmin;
