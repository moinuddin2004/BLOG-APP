import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
     useEffect(() => {
       (async () => {
         const response = await axios.get(`/api/v1/posts/post/${id}`);
         console.log(response.data.data);
         setPost(response.data.data);
       })();
     }, [id, navigate]);
   
 
  return post ? (
    <div className=" bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-5">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
