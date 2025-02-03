import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

function PostDetails() {
  const { id: PostID } = useParams();
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  // Fetch Post Details
  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/post/${PostID}`);
      setPost(res.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoader(false);
    }
  };

  // Delete Post
  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${PostID}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Fetch Post Comments
  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/comments/post/${PostID}`);
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoader(false);
    }
  };

  // Post a Comment
  const postComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await axios.post(
        `${URL}/api/comments/create/`,
        {
          comment,
          author: user?.username,
          postID: PostID,
          userID: user?._id,
        },
        { withCredentials: true }
      );
      setComment("");
      fetchPostComments(); // Refresh comments
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Load post and comments on mount
  useEffect(() => {
    fetchPost();
    fetchPostComments();
  }, [PostID]);

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="border p-3 shadow">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-black md:text-3xl">
                {post?.title || "Post Title"}
              </h1>
              {user?._id === post?.userId && (
                <div className="flex items-center justify-center space-x-2">
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate(`/edit/${PostID}`)}
                  >
                    <BiEdit />
                  </p>
                  <p className="cursor-pointer" onClick={handleDeletePost}>
                    <MdDelete />
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-[100%] flex flex-col justify-center">
            {post?.photo && (
              <img
                src={`${URL}${post.photo}`}
                className="object-cover h-[45vh] mx-auto mt-8"
                alt="Post"
              />
            )}
            <p className="mx-auto mt-8 w-[80%] border p-5 shadow-xl">
              {post?.description || "No description available."}
            </p>
            <div className="flex justify-center items-center mt-8 space-x-4 font-semibold">
              <p>Categories:</p>
              <div className="flex justify-center items-center space-x-2">
                {post?.categories?.map((category, index) => (
                  <div key={index} className="bg-gray-200 rounded px-3 py-1">
                    {category}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center p-3 flex-col mt-4">
              <h3 className="flex justify-center items-center mt-8 font-semibold">
                Comments:
              </h3>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment
                    className=""
                    comment={comment}
                    key={comment._id}
                    post={post}
                  />
                ))
              ) : (
                <p>No comments yet.</p>
              )}
              <div className="border flex justify-center flex-col mt-4 md:flex-row">
                <input
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  type="text"
                  placeholder="Enter your comment"
                  className="md:w-[80%] outline-none py-2 px-4 md:mt-0"
                />
                <button
                  onClick={postComment}
                  className="bg-black text-sm text-white font-semibold px-2 py-2 md:w-[50%] mt-4 md:mt-0"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default PostDetails;
