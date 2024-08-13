import React from "react";
import routerConfig from "./router";
import { RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  return <RouterProvider router={routerConfig}></RouterProvider>;
}

export default App;
