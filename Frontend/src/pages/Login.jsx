import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        const cookies = response.headers["set-cookie"];
        // console.log("Data:", data);
        // console.log("Cookies:", cookies);

        setUser(data);
        navigate("/");
      } else {
        console.error("Login failed with status:", response.status);
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.log("Error:", err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">BlogWebsite</Link>
        </h1>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
      </div>

      <div className="w-full flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center justify-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Login to your Account</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-black outline-0"
            type="email"
            placeholder="Enter your email"
            value={email}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-black outline-0"
            type="password"
            placeholder="Enter your password"
            value={password}
          />

          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold bg-black text-white rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Login
          </button>

          {error && (
            <h3 className="text-red-500 text-sm">Something went wrong</h3>
          )}

          <div className="flex items-center justify-center space-x-3">
            <p>New Here?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
