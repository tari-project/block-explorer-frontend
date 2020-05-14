import React from "react";
import "./App.css";
import BlockExplorer from "./components/BlockExplorer";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import SimpleBarGraph from "./components/Graphs/SimpleBarGraph";

export default function App() {
  const data = [
    11,
    12,
    16,
    10,
    27,
    14,
    15,
    13,
    12,
    33,
    6,
    10,
    24,
    15,
    15,
    12,
    16,
    10,
    27,
    14,
    15,
    13,
    12,
    33,
    6,
    10,
    24,
    15,
    15,
    10,
    32,
    3,
    12,
    16,
    10,
    27,
    14,
    15,
    13,
    12,
    33,
    6,
    10,
    24,
    15,
    15,
    10,
    32,
    3,
    10,
    32,
    3,
    6,
  ];
  return (
    <div className="App">
      <TopBar />
      <div className="App-content">
        <SideBar />
        <div className="App-content-mainArea">
          <SimpleBarGraph
            width={1000}
            height={550}
            yAxisTicks={6}
            title="Circulating Tari"
            subTitle="Total number of mined Tari circulating on the network."
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
