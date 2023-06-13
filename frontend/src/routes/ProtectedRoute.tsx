import { Navigate } from "react-router-dom";

type Props = {
children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const user = JSON.parse(localStorage.getItem("userInfo") || "null");
  return user ? <>{children}</> : <Navigate to="/login/"/>;
}

export default ProtectedRoute;

