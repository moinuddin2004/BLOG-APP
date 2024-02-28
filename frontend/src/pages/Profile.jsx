

import React, { useState, useEffect } from "react";
import { Container, Input, PostCard ,Button} from "../components";
import axios from "axios";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";


function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
    const { register, handleSubmit } = useForm();
  const [showChangePassword, setShowChangePassword] = useState(false);

const [password, setPassword] = useState("");
  const ChangePassword = async (data) => {
  console.log(data);
  try {
    const response = await axios.patch(
      "/api/v1/users/change-password",
      data
    );
    
    console.log(response);
    setShowChangePassword(false);
  } catch (error) {
    console.log(error.message);
  }
};

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/v1/posts/get-user-all-Post");
      setPosts(response.data.data);
    })();
  }, []);

  const toggleChangePassword = () => {
    setShowChangePassword((prev) => !prev);
  };


  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-col items-center mb-8">
          <img
            src={userData.avatar}
            alt=""
            className="rounded-full w-[200px] h-[200px] mb-2"
          />
          <h3 className="text-xl font-bold">Name: {userData.fullName}</h3>
          <p className="text-gray-600">Email: {userData.email}</p>
          <p className="text-gray-600">Username: {userData.username}</p>
          <button
            onClick={toggleChangePassword}
            className="bg-blue-500 text-white px-4 py-2 rounded absolute top-20 right-0 mt-2 mr-2"
          >
            Change Password
          </button>
          {showChangePassword && (
            <div className="absolute top-0 right-0 bg-white p-4 rounded shadow-lg w-[300px] max-h-[350px]  mt-10">
              {/* Content for changing password */}
              <div className="flex flex-row-reverse justify-between">
                <p onClick={toggleChangePassword} className="">
                  ❌{" "}
                </p>
                <h2 className="text-lg font-bold mb-2">Change Password</h2>
              </div>
              <form onSubmit={handleSubmit(ChangePassword)} className="mt-8">
                <div className="space-y-5">
                  <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your old password"
                    {...register("oldPassword", {
                      required: true,
                    })}
                  />
                  {/* oldPassword, newPassword */}
                  <Input
                    label="New Password: "
                    type="password"
                    placeholder="Enter your New password"
                    {...register("newPassword", {
                      required: true,
                    })}
                  />
                  <br />
                  <Button type="submit" className="w-full">
                    ChangePassword
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post._id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Profile;
