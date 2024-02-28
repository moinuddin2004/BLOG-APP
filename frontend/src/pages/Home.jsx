import React, { useEffect, useState } from "react";
// import appwriteService from "../appwrite/database";
import { Container, PostCard } from "../components";
import axios from "axios";


function Home() {
  const [posts, setPosts] = useState([]);
// const [likes, setLikes] = useState(0);

 useEffect(() => {
   (async () => {
     const response = await axios.get("/api/v1/posts/all-Posts");
    //  console.log(response.data.statusCode);

     setPosts([...response.data.data]);


      // const { data } = await axios.get(`/api/v1/posts/get-likes/${post}`);
      // console.log(data);
      // setLikes(data.likes);
   })();
 }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post._id} className="p-2 w-1/4">
              <PostCard {...post}  />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
