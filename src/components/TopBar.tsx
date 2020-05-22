import numeral from 'numeral';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchChainMetadata } from '../api';
import { ReactComponent as Logo } from '../assets/logo.svg';
import './TopBar.css';
import TopBarItem from './TopBarItem';
import TopBarSearch from './TopBarSearch';

export default function TopBar() {
    const [blockHeight, setBlockHeight] = useState('...');

    const loadMetadata = useCallback(async () => {
        const metadata = await fetchChainMetadata();
        const formattedBlockHeight = numeral(metadata.blockHeight).format('0,0');
        setBlockHeight(formattedBlockHeight);
    }, []);

    useEffect(() => {
        loadMetadata();
    }, [loadMetadata]);

    return (
        <div className="TopBar">
            <div className="TopBar-logoContainer">
                <Logo fill="#9330ff" />
            </div>
            <div className="TopBar-searchContainer">
                <TopBarSearch />
                <div className="TopBar-itemContainer">
                    <TopBarItem label="Total Txns" value="83.5K" />
                    <TopBarItem label="Average Txns/second" value="124" />
                    <TopBarItem label="Hash Rate" value="3.5TH" />
                    <TopBarItem label="Average Fee" value="0.05" />
                    <TopBarItem label="Average Block Time" value="2:01" />
                    <TopBarItem label="Current Block Height" value={blockHeight} />
                </div>
            </div>
        </div>
    );
}
