import { useRoutes } from "react-router";
import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreateQuote from "./components/CreateQuote";
import OtherUserProfile from "./components/OtherUserProfile";

function Routes() {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/profile", element: <Profile /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/create", element: <CreateQuote /> },
    { path: "/profile/:userid", element: <OtherUserProfile /> },
  ]);
  return routes;
}

export default Routes;
