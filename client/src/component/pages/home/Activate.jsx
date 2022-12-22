import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../../feature/createPost/CreatePost"
import Header from "../../feature/header/Header"
import LeftHome from "../../feature/home/lefthome/LeftHome"
import Map from "../../feature/home/map/Map"
import RightHome from "../../feature/home/rightHome/RightHome"
import "./home.css"
import ActivateForm from "./ActivateForm";
import axios from "axios";
import Cookies from "js-cookie";
export default function Activate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState(" ");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  console.log(token);
  useEffect(() => {
    activateAccount();
  }, []);
  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:8080/user/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: "VERIFY",
        payload: true,
      });

    //   setTimeout(() => {
    //     navigate("/");
    //   }, 3000);
    } catch (error) {
      setError(error.response.data.message);
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 3000);
    }
  };
  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeded."
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed."
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Map />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}