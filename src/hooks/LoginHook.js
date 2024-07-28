import { useState } from "react";
import useAuthHook from "./AuthHook"; // Correct import

export const LoginHook = () => {
  const { login, error, isLoading } = useAuthHook();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
    isLoading,
    handleLogin,
  };
};

export default LoginHook;
