import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupForm() {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      alert("resigeration successfull");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  useEffect(()=>{
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if(user){
      navigate("/");
    }
  },[])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSignup}>
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <div className="mt-4">
            <label className="block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
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
              Sign Up
            </button>
          </div>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <p
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer"
            >
              Login here
            </p>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
