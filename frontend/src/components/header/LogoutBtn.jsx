import React from "react";
import { logout } from "../../store/authSlice.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LogoutBtn() {
  const dispatch = useDispatch();
const Navigate=useNavigate()
  const logoutHandler = async () => {
    try {
      const response = await axios.post("/api/v1/users/logout");
      
      dispatch(logout());
      Navigate("/");
    
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      logout
    </button>
  );
}

export default LogoutBtn;
