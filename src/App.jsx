import React, { useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import AppBar from "./components/AppBar";
import MapLoader from "./components/MapLoader";
import Captcha from "./components/Captcha";
import { useState } from "react";
import "antd/dist/antd.css";



function App() {

  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem("isAuthenticated") == "true"){
      setAuth(true);
      sessionStorage.clear();
    }
  },[])

  const app = () => {

    return(
      <div id="main">
        <AppBar/>
        <MapLoader/>
        <div id="view"></div>
      </div>
    );
  }

  return(
    isAuth ? app() : <Captcha/>
  )
}

export default App;
