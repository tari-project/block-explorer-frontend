import React from "react";
import "./App.css";
import BlockExplorer from "./components/BlockExplorer";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

export default function App() {
  return (
    <div className="App">
      <TopBar />
      <div className="App-content">
        <SideBar />
        <div className="App-content-mainArea">
          <BlockExplorer />
        </div>
      </div>
    </div>
  );
}
