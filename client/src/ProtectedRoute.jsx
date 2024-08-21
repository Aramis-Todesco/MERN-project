import { useContext } from "react";
import UserContext from "./context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { isLogged } = useContext(UserContext);
  return isLogged ? element : <Navigate to={"/logged-out"} />;
};

export default ProtectedRoute;
