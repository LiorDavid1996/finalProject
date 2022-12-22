import { useSelector } from "react-redux"
import CreatePost from "../../feature/createPost/CreatePost"
import Header from "../../feature/header/Header"
import LeftHome from "../../feature/home/lefthome/LeftHome"
import Map from "../../feature/home/map/Map"
import RightHome from "../../feature/home/rightHome/RightHome"
import "./home.css"
export default function Home() {
  const {user}=useSelector((user)=>({...user}))
  return (
    <div className="home">
    <Header/>
    <LeftHome user={user}/>
    <div className="home_middle" >
      <Map/>
      <CreatePost user={user}/>
    </div>
    <RightHome/>
    </div>
    
  )
}
