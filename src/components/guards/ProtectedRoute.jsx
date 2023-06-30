import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  return (
    <>
    {isAuthenticated ? <Component /> : <Navigate to={"/"}/>}
    </>
  );
};

export default ProtectedRoute;
// state={{ from: routeProps.location }}
