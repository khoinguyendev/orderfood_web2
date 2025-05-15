import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const PrivateRouter = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return <Navigate to="/admin/sign-in" replace />;
  if (user.role === "CUSTOMER") return <Navigate to="/" replace />;
  return <Outlet />;
};

export default PrivateRouter;
