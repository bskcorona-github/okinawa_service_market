import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );

      // res.dataが存在するかチェック
      if (res && res.data) {
        alert("Login successful");
        console.log(res.data);

        // JWTトークンが存在するか確認し、保存
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        } else {
          throw new Error("Token not provided");
        }
      } else {
        throw new Error("No response data");
      }
    } catch (err) {
      // エラー内容をより詳しく表示
      console.error(
        "Error during login:",
        err.response ? err.response.data : err.message
      );
      alert("Error logging in");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
