import { Routes, Route } from "react-router-dom";
import Login from "./component/pages/Login/Login"
import Profile from "./component/pages/profile/profile";
import Home from "./component/pages/home/Home";
import LoggedInRoutes from "./component/helpers/LoggedInRoutes";
import NotLoggedInRoutes from "./component/helpers/NotLoggedInRoutes";
import { useSelector } from "react-redux";
import Activate from "./component/pages/home/Activate"
import Reset from "./component/pages/rest/Rest"
import CreatePostPopup from "./component/feature/createPostPopup/CreatePostPopup";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
function reducer(state, action) {
  switch (action.type) {
    case "POSTS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };
    case "POSTS_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
function App() {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
    loading: false,
    posts: [],
    error: "",
  });
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `http://localhost:8080/post/getAllpost`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.log(1);
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  return (
    <div>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route
            path="/"
            element={<Home setVisible={setVisible} posts={posts} />}
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/rest" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
