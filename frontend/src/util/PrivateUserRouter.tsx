import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const PrivateUserRouter = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default PrivateUserRouter;
