import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component }) => {
  const token = useSelector((state) => state.user.token);

  const isAuthenticated = token === null || undefined ? false : true;

  return (
    <>{isAuthenticated ? <Navigate to={"/dashboard"} /> : <Component />}</>
  );
};

export default PublicRoute;
