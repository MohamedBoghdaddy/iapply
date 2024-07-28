// Login.js
import React from "react";
import "../../styles/login.css"; // Adjust the path as needed
import { Link } from "react-router-dom";
import LoginHook from "../../../../hooks/LoginHook";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
    isLoading,
    handleLogin,
  } = LoginHook();

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="left-login">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
