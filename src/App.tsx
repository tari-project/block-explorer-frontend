import React, { useEffect, useState } from 'react';
import './App.css';
import BlockExplorer from './components/BlockExplorer';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { fetchBlocksData } from './helpers/api';

export default function App() {
    const [latestBlocks, setLatestBlocks] = useState([]);
    useEffect(() => {
        try {
            fetchBlocksData(100).then((blockData) => {
                // setInterval(() => {
                //     const block: any = blockData.blocks.pop();
                //     blockData.blocks.unshift(block);
                //     console.log('block', block);
                // }, 5000);
                setLatestBlocks(blockData.blocks as any);
            });
        } catch (e) {
            console.error(e);
        }
    });

    return (
        <div className="App">
            <TopBar />
            <div className="App-content">
                <SideBar />
                <div className="App-content-mainArea">
                    <BlockExplorer blocks={latestBlocks as any[]} />
                </div>
            </div>
        </div>
    );
}
