import { Route,Routes } from "react-router-dom";
import Home from "./component/pages/home/Home";
import Login from "./component/pages/Login/Login";
import LoggedInRoutes from "../src/component/helpers/LoggedInRoutes"
import NotLoggedInRoutes from "../src/component/helpers/NotLoggedInRoutes"
import Activate from "./component/pages/home/Activate";
import Rest from "./component/pages/rest/Rest";

function App() { 

  return(
    <div>
    <Routes>
      <Route element={<NotLoggedInRoutes/>}>
      <Route path="/login" element={<Login />} exact />
      </Route>
         <Route element={<LoggedInRoutes/>}>
        <Route path="/Activate/:token" element={<Activate />} exact />
        <Route path="/" element={<Home />} exact />
         </Route>
        <Route path="/rest" element={<Rest/>} exact />

      </Routes>
      </div>
  )

}

export default App;
