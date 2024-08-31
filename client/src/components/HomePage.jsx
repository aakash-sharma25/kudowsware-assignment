import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [id, setId] = useState("");

  const handleResumeUpload = async () => {
    if (!resume) return;

    try {
      const formData = new FormData();
      formData.append("file", resume);
      formData.append("upload_preset", "gduvf4ky");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcmysvzfx/raw/upload",
        formData
      );

      return response?.data?.secure_url;
    } catch (err) {
      console.error("Error uploading to Cloudinary:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const resumeUrl = await handleResumeUpload();

    if (!resumeUrl) {
      alert("Failed to upload resume. Please try again.");
      setUploading(false);
      return;
    }

    try {
      const serverResponse = await axios.post("/api/user/userDetails", {
        id,
        phone,
        resumeLink: resumeUrl,
        name,
        email,
      });

      alert(serverResponse.data.message);
      setName("");
      setEmail("");
      setPhone("");
      setResume("");
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Failed to submit application. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (!user) {
      navigate("/login");
    }
    console.log(user);
    setId(user?.user?._id);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center">
          Welcome to Job Portal
        </h1>
        <p className="mt-4 text-center text-gray-700">
          Apply for your dream job by filling out the form below.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Resume (PDF only)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              required
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {uploading ? "Uploading..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
