import { Route,Routes } from "react-router-dom";
import Login from "./component/feature/login/Login";
import Home from "./component/pages/home/Home";
function App() {
  return(
    <Routes>
  <Route path="/login" element={<Login/>} exact/>'
  <Route path="/" element={<Home/>} exact/>
</Routes>
  )

}

export default App;
