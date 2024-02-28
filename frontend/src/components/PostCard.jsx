// import React, { useEffect, useState } from "react";
// // import appwriteService from "../appwrite/database";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";


// function PostCard({ _id, title, thumbnail, likes }) {
//   const [liked, setLiked] = useState(false);
//   const [like, setLike] = useState(0);
//   // const [isliked,setIsliked]=useState()
//   const userData = useSelector((state) => state.auth.userData);
// console.log("liked is"+liked);
// //   if (likes.includes(userData._id)) {
// //   setLiked(true);
// // }
//   const handleLike = async () => {
//     try {
//       if (!liked) {
//         await axios.patch(`/api/v1/posts/add-like/${_id}`);
//       } else {
//         await axios.patch(`/api/v1/posts/dis-like/${_id}`);
//       }
//       setLiked(!liked);
//     } catch (error) {
//       console.error("Error toggling like/dislike:", error);
//     }
//   };

//   useEffect(() => {
//   //   if (!liked) {
//   // setLiked(likes.includes(userData._id));
//   //   }
//     setLiked(likes.includes(userData._id))
//       ; (async () => {
//     const res = await axios.get(`/api/v1/posts/get-likes/${_id}`);
//     // console.log(res.data.data);

//     setLike(res.data.data);
//   })();
   
//   },[like,userData._id,liked,setLiked])



//   return (
//     <div className="w-full bg-gray-100 rounded-xl p-4">
//       <Link to={`/post/${_id}`}>
//         <div className="w-full justify-center mb-4">
//           <img src={thumbnail} alt={title} className="rounded-xl" />
//         </div>
//         <h2 className="text-xl font-bold">{title}</h2>
//         <p></p>
//       </Link>
//       <span
//         className={`fas fa-heart ${
//          liked ? "text-red-500" : "text-gray-500"
//         }`}
//         onClick={handleLike}
//         style={{ cursor: "pointer" }}
//       ></span>
//       <span className="ml-1">{like}</span>
//     </div>
//   );
// }

// export default PostCard;














import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function PostCard({ _id, title, thumbnail, likes }) {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(0);
  const userData = useSelector((state) => state.auth.userData);

  const handleLike = async () => {
    try {
      if (!liked) {
        await axios.patch(`/api/v1/posts/add-like/${_id}`);
        setLike(like + 1); // Increment like count
      } else {
        await axios.patch(`/api/v1/posts/dis-like/${_id}`);
        setLike(like - 1); // Decrement like count
      }
      setLiked(!liked); // Toggle liked state
    } catch (error) {
      console.error("Error toggling like/dislike:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/v1/posts/get-likes/${_id}`);
      setLike(res.data.data);
      setLiked(likes.includes(userData._id)); // Set liked state based on whether current user has liked the post
    })();
  }, []);

  return (
    <div className="w-full bg-gray-100 rounded-xl p-4">
      <Link to={`/post/${_id}`}>
        <div className="w-full justify-center mb-4">
          <img src={thumbnail} alt={title} className="rounded-xl" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p></p>
      </Link>
      <span
        className={`fas fa-heart ${liked ? "text-red-500" : "text-gray-500"}`}
        onClick={handleLike}
        style={{ cursor: "pointer" }}
      ></span>
      <span className="ml-1">{like}</span>
    </div>
  );
}

export default PostCard;
