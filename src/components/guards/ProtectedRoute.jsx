import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component }) => {
  const token = useSelector(state => state.user.token)

  const isAuthenticated = token === null || undefined ? false : true;

  return (
    <>
    {isAuthenticated ? <Component /> : <Navigate to={"/login"}/>}
    </>
  );
};
//  state={{ from: "/dashboard" }}
export default ProtectedRoute;
