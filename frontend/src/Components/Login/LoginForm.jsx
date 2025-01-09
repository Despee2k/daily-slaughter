import LoginInput from "./LoginInput";
import Button from "../UI/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(username, password);
      const response = await axios.post("http://localhost:5000/login", {
        Username: username,
        Password: password,
      });
      console.log(response);

      const token = response.data.token;
      setToken(token);
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative h-80 w-96 rounded-2xl bg-[#FFFFFF] drop-shadow-md">
      <form onSubmit={handleLogin}>
        <LoginInput
          type="text"
          name="Username"
          label="Username"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginInput
          type="password"
          name="Password"
          label="Password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          label="Login"
          style="w-24 h-8 text-[#FFFFFF] bg-[#4169E1] rounded-xl mt-10 mr-8 absolute right-0 hover:bg-[#3654C9]"
        />
      </form>
    </div>
  );
};

export default LoginForm;
