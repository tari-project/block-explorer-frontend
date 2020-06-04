import React, { useEffect, useState } from 'react';
import './App.css';
import BlockExplorer from './components/BlockExplorer';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { fetchBlocksData, fetchNetworkDifficulty } from "./helpers/api";

export default function App() {
    const [latestBlocks, setLatestBlocks] = useState([]);
    const [estimatedHashRate, setTotalDifficulty] = useState(([] as unknown) as any);
    useEffect(() => {
        try {
            fetchBlocksData(100).then((blockData) => {
                setLatestBlocks(blockData.blocks as any);
            });
            fetchNetworkDifficulty().then((data) => {
                setTotalDifficulty(data);
            });
        } catch (e) {
            console.error(e);
        }
    }, []);
    return (
        <div className="App">
            <TopBar />
            <div className="App-content">
                <SideBar />
                <div className="App-content-mainArea">
                    <BlockExplorer blocks={latestBlocks as any[]} difficulty={estimatedHashRate as any[]} />
                </div>
            </div>
        </div>
    );
}
