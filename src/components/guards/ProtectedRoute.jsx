import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  const token = localStorage.getItem("token")
  const isAuthenticated = token === null || undefined ? false : true;

  return (
    <>
    {isAuthenticated ? <Component /> : <Navigate to={"/login"}/>}
    </>
  );
};
//  state={{ from: "/dashboard" }}
export default ProtectedRoute;
