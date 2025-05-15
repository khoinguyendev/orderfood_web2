import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/client/AppLayout";
import Home from "./page/client/Home";
import AdminLayout from "./layout/admin/AdminLayout";
import Product from "./page/admin/product/Product";
import Order from "./page/admin/order/Order";
import Dashboard from "./page/admin/Dashboard";
import PrivateRouter from "./util/PrivateRouter";
import PageTitle from "./util/PageTitle";
import ProductDetail from "./page/client/ProductDetail";
import ProductCategory from "./page/client/ProductCategory";
import Search from "./page/client/Search";
import Category from "./page/admin/category/Category";
import Brand from "./page/admin/brand/Brand";
import AddBrand from "./page/admin/brand/AddBrand";
import EditBrand from "./page/admin/brand/EditBrand";
import DeletedProduct from "./page/admin/product/DeletedProduct";
import axios from "axios";
import { loginSuccess } from "./redux/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SERVER_HOST } from "./config/Url";
import { initializeCart } from "./redux/cartSlice";
import MapPicker from "./components/client/MapPicker";
import ListImage from "./page/admin/image/ListImage";
import AddCategoryNew from "./page/admin/category/AddCategoryNew";
import EditCategoryNew from "./page/admin/category/EditCategoryNew";
import AddProductNew from "./page/admin/product/AddProductNew";
import EditProductNew from "./page/admin/product/EditProductNew";
import ProductFilter from "./page/client/ProductFilter";
import GoogleLogin from "./page/admin/GoogleLogin";
import { IUser } from "./types/User";
import LoginAdmin from "./page/admin/LoginAdmin";
import NotFound from "./page/NotFound";
import PrivateUserRouter from "./util/PrivateUserRouter";
import User from "./page/admin/user/User";
import AddUser from "./page/admin/user/AddUser";
import ScrollToTop from "./util/ScrollToTop";
import TabMe from "./page/client/TabMe";
import ProfileOrder from "./page/client/ProfileOrder";
import Review from "./page/admin/review/Review";
import ProfileInfo from "./page/client/ProfileInfo";
import ChangePassword from "./page/admin/auth/ChangePassword";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      // if (token) {
      //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //   dispatch(loginSuccess(token)); // Lưu token vào Redux store
      // }
      if (token) {
        try {
          const response = await axios.get(`${SERVER_HOST}/users/my-info`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // const user: IUser = {
          //   email: response.data.data.email,
          //   role: response.data.data.role,

          // };
          const user: IUser = response.data.data;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          dispatch(loginSuccess({ token, user })); // Lưu token vào Redux store
        } catch (error) {
          localStorage.removeItem("token");
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(initializeCart()); // ✅ Dispatch action hợp lệ
  }, [dispatch]);
  if (isLoading) return;
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <>
                <PageTitle title="Trang chủ" />
                <Home />
              </>
            }
          />
          {/* <Route
            path="dang-nhap"
            element={
              <>
                <PageTitle title="Đăng nhập" />
                <Login />
              </>
            }
          />
          <Route
            path="dang-ky"
            element={
              <>
                <PageTitle title="Đăng kí" />
                <Register />
              </>
            }
          /> */}
          <Route
            path="bo-loc-san-pham"
            element={
              <>
                <PageTitle title="Món ăn" />
                <ProductFilter />
              </>
            }
          />
          <Route
            path="san-pham"
            element={
              <>
                <PageTitle title="Sản phẩm" />
                <ProductDetail />
              </>
            }
          />
          <Route
            path="danh-muc/:id"
            element={
              <>
                <PageTitle title="Danh mục" />
                <ProductCategory />
              </>
            }
          />
          <Route
            path="map"
            element={
              <>
                <PageTitle title="Danh mục" />
                <MapPicker />
              </>
            }
          />
          <Route
            path="search"
            element={
              <>
                <PageTitle title="Tìm kiếm" />
                <Search />
              </>
            }
          />
          <Route path="/thong-tin-cua-toi" element={<PrivateUserRouter />}>
            <Route element={<TabMe />}>
              <Route
                index
                element={
                  <>
                    <PageTitle title="Đơn hàng" />
                    <ProfileOrder />
                  </>
                }
              />
              <Route
                path="profile"
                element={
                  <>
                    <PageTitle title="Thông tin cá nhân" />
                    <ProfileInfo />
                  </>
                }
              />
            </Route>
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/sign-in" element={<LoginAdmin />} />
        <Route path="/admin" element={<PrivateRouter />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="crud/list/products" element={<Product />} />
            <Route path="crud/create/products" element={<AddProductNew />} />
            <Route path="crud/edit/products/:id" element={<EditProductNew />} />
            <Route path="crud/deleted/products" element={<DeletedProduct />} />
            <Route path="crud/list/category" element={<Category />} />
            <Route path="crud/create/category" element={<AddCategoryNew />} />
            <Route path="crud/edit/category/:id" element={<EditCategoryNew />} />
            <Route path="crud/list/brand" element={<Brand />} />
            <Route path="crud/create/brand" element={<AddBrand />} />
            <Route path="crud/edit/brand/:id" element={<EditBrand />} />
            <Route path="crud/list/orders" element={<Order />} />
            <Route path="crud/list/images" element={<ListImage />} />
            <Route path="crud/list/users" element={<User />} />
            <Route path="crud/create/users" element={<AddUser />} />
            <Route path="crud/list/reviews" element={<Review />} />
            {/* <Route path="order" element={<OrderNotifications />} /> */}
                        <Route path="auth/password" element={<ChangePassword />} />

          </Route>
        </Route>
        <Route path="/google/call-back" element={<GoogleLogin />} />
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
