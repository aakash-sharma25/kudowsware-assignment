import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message);
      console.error(error);
    }
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <div className="mt-4">
            <label className="block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="mt-4">
            <label className="block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-600">
              Login
            </button>
          </div>
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <p
              onClick={() => navigate("/signup")}
              className="text-blue-600
              hover:underline"
            >
              Sign up here
            </p>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
