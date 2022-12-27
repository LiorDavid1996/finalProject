import { useSelector } from "react-redux"
import CreatePost from "../../feature/createPost/CreatePost"
import Header from "../../feature/header/Header"
import LeftHome from "../../feature/home/lefthome/LeftHome"
import Map from "../../feature/home/map/Map"
import RightHome from "../../feature/home/rightHome/RightHome"
import Post from "../../../component/post/index"
import { useState,useRef,useEffect } from "react"
import "./home.css"
export default function Home({ setVisible, posts}) {
  console.log(posts)
  const {user}=useSelector((user)=>({...user}))
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, []);
  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
    <Header/>
    <LeftHome user={user}/>
    <div className="home_middle" ref={middle} >
      <Map/>
      <CreatePost user={user} setVisible={setVisible}/>
      <div className="posts">
          {posts?.map((post) => (
            
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
    </div>
    <RightHome/>
    </div>
    
  )
}
