import React, { useEffect, useState } from 'react';
import './App.css';
import BlockExplorer from './components/BlockExplorer';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { fetchBlocksData, setupWebsockets } from './helpers/api';
import store from './store';

export default function App() {
    useEffect(() => {
        const sockets = setupWebsockets(store);
        return function cleanup() {
            sockets.close();
        };
    }, []);

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
