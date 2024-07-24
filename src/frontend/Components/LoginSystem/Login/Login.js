import React, { useState, useContext } from "react";
import "../../styles/login.css"; // Adjust the path as needed
import { Link } from "react-router-dom";
import { useLogin } from "../../../../hooks/useLogin"; // Adjust the path as needed
import AuthContext from "../../../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login({ email, password });
    } catch (err) {
      setError("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="left-login">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <div className="field-wrapper">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading} // Disable input while loading
                  required
                />
              </div>
            </div>
            <div className="field password-container">
              <div className="field-wrapper">
                <label htmlFor="password">Password:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading} // Disable input while loading
                  required
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading} // Disable button while loading
                >
                  <i className="fas fa-eye"></i>
                </button>
              </div>
            </div>
            {error && <div className="error">{error}</div>}
            <button className="left_btn" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}{" "}
              {/* Show loading text while loading */}
            </button>
          </form>
        </div>

        <div className="right-login">
          <h1>Don't have an account?</h1>
          <Link to="/signup">
            <button className="right_btn" type="button" disabled={isLoading}>
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
