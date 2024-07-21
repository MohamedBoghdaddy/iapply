import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          gender,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        setSuccessMessage("Registration successful");
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
      } else {
        setErrorMessage(json.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    gender,
    setGender,
    errorMessage,
    successMessage,
    isLoading,
    handleSignup,
  };
};
