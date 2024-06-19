import { Routes, Route, useLocation, } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";

import Hero from "./pages/Hero";
import Accounts from "./pages/Accounts";
import { userStore } from "./stores/UserStore";
import { useEffect } from "react";
import { checkSession } from "./modules/basicApis";



function App() {

        const { setUserInfo, userInfo } = userStore();
        const location = useLocation();
       
        useEffect(() => {
          async function session() {
            if (userInfo.user_id) {
              return;
            }
            const check = await checkSession();
            console.log("check session", check);
            setUserInfo(check);
            if (check.message === "No session found") {
              console.log("not logged in");
              if(location.pathname === "/signin" || location.pathname === "/signup"){
                return;
              }
              window.location.href = "/signin";
            }
          }
          session();
        }, []);
 
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/home" element={<Home />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
