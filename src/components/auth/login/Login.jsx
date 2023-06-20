import "./Login.scss";
import AuthLeftSide from "components/primitives/auth-left-side/AuthLeftSide";
import LoginForm from "components/primitives/login-form/LoginForm";

const Login = () => {
  return (
    <div className="auth center">
      <div className="auth_left">
        <AuthLeftSide />
      </div>
      <div className="auth_right center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
