import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("Artificial Intelligence");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  const deleteCategory = (i) => {
    const updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    if (!cat || cats.includes(cat)) return;
    setCats([...cats, cat]);
    setCat("Artificial Intelligence");
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title || !desc || cats.length === 0) {
      alert("Please fill out all fields and add at least one category.");
      return;
    }

    const post = {
      title,
      desc,
      username: user?.username,
      userId: user?._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = `${Date.now()}_${file.name}`;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        await axios.post("http://localhost:8000/api/upload", data);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/posts/create",
        post,
        { withCredentials: true }
      );
      navigate(`/posts/post/${res.data._id}`);
    } catch (err) {
      console.error("Post creation failed:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center min-h-screen bg-gray-100 py-8">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center text-gray-700">
            Create a New Post
          </h1>
          <form onSubmit={handleCreate} className="mt-6 space-y-6">
            {/* Title */}
            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* File Upload */}
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg"
            />

            {/* Categories */}
            <div>
              <div className="flex items-center space-x-4">
                <select
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="px-4 py-2 border rounded-lg outline-none"
                >
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Big Data">Big Data</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Business Management">Business Management</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Database">Database</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Operating System">Operating System</option>
                  <option value="Enterprise">Enterprise</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Robotics">Robotics</option>
                  <option value='Temple'>Temple</option>
                  <option value="Mobile Phones">Mobile Phones</option>
                </select>
                <button
                  type="button"
                  onClick={addCategory}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Add Category
                </button>
              </div>

              {/* Selected Categories */}
              <div className="flex flex-wrap mt-4 space-x-2">
                {cats.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 text-sm bg-gray-200 rounded-full"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => deleteCategory(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <ImCross size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <textarea
              rows="5"
              placeholder="Enter post description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePost;
