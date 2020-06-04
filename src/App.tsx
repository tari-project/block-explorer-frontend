import React, { useEffect, useState } from 'react';
import './App.css';
import BlockExplorer from './components/BlockExplorer';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { fetchBlocksData, fetchConstants } from './helpers/api';

export default function App() {
    const [latestBlocks, setLatestBlocks] = useState([]);
    const [constants, setConstants] = useState({});
    useEffect(() => {
        try {
            fetchBlocksData(100).then((blockData) => {
                setLatestBlocks(blockData.blocks as any);
            });
        } catch (e) {
            console.error(e);
        }
    }, []);
    useEffect(() => {
        try {
            fetchConstants().then((constants) => {
                setConstants(constants);
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
                    <BlockExplorer constants={constants} blocks={latestBlocks as any[]} />
                </div>
            </div>
        </div>
    );
}
