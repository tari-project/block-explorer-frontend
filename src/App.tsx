import React, { useEffect, useState } from 'react';
import './App.css';
import BlockExplorer from './components/BlockExplorer';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { fetchBlocksData } from './helpers/api';

export default function App() {
    const [latestBlocks, setLatestBlocks] = useState([]);
    const [latestTotalMiningTimes, setLatestTotalMiningTimes] = useState(0);
    useEffect(() => {
        try {
            fetchBlocksData(100).then((blockData) => {
                setLatestBlocks(blockData.blocks as any);
                setLatestTotalMiningTimes(blockData.totalMiningTimes as number);
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
                    <BlockExplorer blocks={latestBlocks as any[]} totalMiningTimes={latestTotalMiningTimes as number} />
                </div>
            </div>
        </div>
    );
}
