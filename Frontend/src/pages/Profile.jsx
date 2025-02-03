import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get(`http://localhost:8000/api/users/${user._id}`);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(""); // Clear password field for security
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const response = await fetch(`http://localhost:8000/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUpdated(true);
      } else {
        console.log("Update failed:", response.status);
        setUpdated(false);
      }
    } catch (error) {
      console.log(error);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.delete(`http://localhost:8000/api/users/${user._id}`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  if (!user) return <p>Loading user information...</p>;

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-6 md:px-16 mt-8 flex justify-center items-center">
        <div className="w-full max-w-md border p-6 rounded-md shadow-2xl shadow-gray-500 bg-white">
          <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
          <div className="flex flex-col space-y-4">
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none w-full border-b py-2 text-gray-700 focus:border-black"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none w-full border-b py-2 text-gray-700 focus:border-black"
              placeholder="Your email"
              type="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none w-full border-b py-2 text-gray-700 focus:border-black"
              placeholder="Your password"
              type="password"
            />
            <div className="flex justify-between mt-6">
              <button
                onClick={handleUserUpdate}
                className="w-[48%] text-white font-semibold bg-black px-4 py-2 rounded hover:bg-gray-800"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="w-[48%] text-white font-semibold bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                User updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
