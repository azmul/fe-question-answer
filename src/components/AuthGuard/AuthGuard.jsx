import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useStore } from "../../Store";

export default function AuthGuard() {
  const location = useLocation();

  const { user } = useStore((state) => {
    return {
      user: state.user,
    };
  });

  return user && user?.access_token ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" replace state={{ from: location }} />
  );
}
