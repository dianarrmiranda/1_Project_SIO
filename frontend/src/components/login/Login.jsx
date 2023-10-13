import React from "react";
import "./Login.css";
import Navbar from "../layout/Navbar";

const Login = () => {
  return (
    <div>
      <Navbar />
      <div id="login">
        <h1>Login</h1>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
