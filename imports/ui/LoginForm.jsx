import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await Meteor.loginWithPassword(username, password);
      // Clear form on successful login
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.reason || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setError(""); // Clear error when user starts typing
    if (field === "username") {
      setUsername(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>
        
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            name="username"
            value={username}
            required
            disabled={isLoading}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            required
            disabled={isLoading}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="form-input"
          />
        </div>

        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading || !username || !password}
        >
          {isLoading ? (
            <>
              <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="login-footer">
          <p>Demo credentials: <strong>meteor</strong> / <strong>password</strong></p>
        </div>
      </form>
    </div>
  );
};