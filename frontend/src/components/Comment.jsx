import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Btn from "./Button";

const Comment = ({ _id, content, owner, likes, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(0);
  const [updating, setUpdating] = useState(false);
    const [newContent, setNewContent] = useState(content);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = owner[0]._id === userData._id;
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/v1/comments/like/${_id}`);
        setLike(res.data.data);
        setLiked(likes.includes(userData._id));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [_id, likes, userData._id]);

  const handleLike = async () => {
    try {
      if (!liked) {
        await axios.patch(`/api/v1/comments/like/${_id}`);
        setLike(like + 1); // Increment like count
      } else {
        await axios.patch(`/api/v1/comments/dislike/${_id}`);
        setLike(like - 1); // Decrement like count
      }
      setLiked(!liked); // Toggle liked state
    } catch (error) {
      console.error("Error toggling like/dislike:", error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await axios.delete(`/api/v1/comments/c/${_id}`);
      onDelete(_id); // Update frontend by deleting the comment
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.patch(`/api/v1/comments/c/${_id}`, { content: data.content });
      setNewContent(data.content);
      setUpdating(false);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <>
      {updating ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            defaultValue={newContent}
            {...register("content")}
          />
          <button type="submit">Update</button>
          <button onClick={() => setUpdating(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <img src={owner[0].avatar} alt={owner[0]._id} />
          <p>{owner[0].username}</p>
          <p>{newContent}</p>
          <span
            className={`fas fa-heart ${
              liked ? "text-red-500" : "text-gray-500"
            }`}
            onClick={handleLike}
            style={{ cursor: "pointer" }}
          ></span>
          <span className="ml-1">{like}</span>
          {isAuthor && (
            <>
              <Btn bgColor="bg-green-500" onClick={() => setUpdating(true)}>
                Update
              </Btn>
              <Btn bgColor="bg-red-500" onClick={handleDeleteComment}>
                Delete
              </Btn>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Comment;
