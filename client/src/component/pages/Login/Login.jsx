import "./login.css";
// import LoginForm from "../../components/feature/LoginForm";
import LoginForm from "../../feature/login/LoginForm";
import RegisterForm from "../../feature/login/RegisterForm";
import { useState } from "react";

export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
       
      </div>
    </div>
  );
}
