import React from "react";
import "./App.css";
import BlockExplorer from "./components/BlockExplorer";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import SimpleBarGraph from "./components/Graphs/SimpleBarGraph";

export default function App() {
  return (
    <div className="App">
      <TopBar />
      <div className="App-content">
        <SideBar />
        <div className="App-content-mainArea">
          <SimpleBarGraph width={1000} height={550} data={[1, 2, 3, 4, 5]} />
        </div>
      </div>
    </div>
  );
}
