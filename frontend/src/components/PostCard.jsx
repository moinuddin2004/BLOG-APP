import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { BackgroundGradient } from "../components/ui/background-gradient";

function PostCard({ _id, title, thumbnail, likes, owner }) {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(0);
  const userData = useSelector((state) => state.auth.userData);
  const userStatus = useSelector((state) => state.auth.status);
  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(thumbnail);

  const handleLike = async () => {
    try {
      if (!liked) {
        await axios.patch(`/api/v1/posts/add-like/${_id}`);
        setLike(like + 1);
      } else {
        await axios.patch(`/api/v1/posts/dis-like/${_id}`);
        setLike(like - 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like/dislike:", error);
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(`/api/v1/posts/get-likes/${_id}`);
        setLike(res.data.data);
        if (userData) {
          setLiked(likes.includes(userData._id));
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [likes, _id, userData, userStatus]);

  useEffect(() => {
    if (!userStatus) {
      setLiked(false);
    }
  }, [userStatus]);

  return (
    <BackgroundGradient>
      <div className="bg-black rounded-2xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
        <Link to={`/post/${_id}`} className="block">
          <div className="text-gray-300 text-xl font-semibold mb-2 px-4 py-2">
            {title}
          </div>
          <div className="overflow-hidden rounded-t-2xl">
            {isImage ? (
              <img
                src={thumbnail}
                className="w-full h-48 object-cover"
                alt="thumbnail"
              />
            ) : (
              <video
                src={thumbnail}
                className="w-full h-48 object-cover"
                controls
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </Link>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <span
              className={`fas fa-heart ${
                liked ? "text-red-500" : "text-gray-500"
              }`}
              onClick={handleLike}
              style={{ cursor: "pointer" }}
            ></span>
            <span className="text-gray-400">{like}</span>
          </div>
          <img
            src={owner.avatar}
            alt="avatar"
            className="rounded-full w-10 h-10 border-2 border-gray-700"
          />
        </div>
      </div>
    </BackgroundGradient>
  );
}

export default PostCard;
