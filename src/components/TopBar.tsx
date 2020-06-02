import numeral from 'numeral';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchChainMetadata } from '../api';
import { ReactComponent as Logo } from '../assets/logo.svg';
import './TopBar.css';
import TopBarItem from './TopBarItem';
import TopBarSearch from './TopBarSearch';

export default function TopBar() {
    const [blockHeight, setBlockHeight] = useState('...');
    const [totalTransactions, setTotalTransactions] = useState('...');
    const [averageTxPerSecond, setAverageTxPerSecond] = useState('...');
    const [hashRate, setHashRate] = useState('...');
    const [averageFee, setAverageFee] = useState('...');
    const [averageBlockTime, setAverageBlockTime] = useState('...');

    const loadMetadata = useCallback(async () => {
        const metadata = await fetchChainMetadata();

        const formattedBlockHeight = numeral(metadata.blockHeight).format('0,0');
        setBlockHeight(formattedBlockHeight);

        const formattedTotalTransactions = numeral(metadata.totalTransactions).format('0,0');
        setTotalTransactions(formattedTotalTransactions);

        const calcAverageTxPerSecond = metadata.totalTransactions / metadata.avgBlockTimes;
        const formattedCalcAverageTxPerSecond = numeral(calcAverageTxPerSecond).format('0.0');
        setAverageTxPerSecond(formattedCalcAverageTxPerSecond);

        const formattedHashRate = numeral(metadata.averageDifficulty.estimatedHashRate).format('0.0 a') + 'H';
        setHashRate(formattedHashRate);

        const formattedAverageFee = numeral(metadata.averageFee).format('0,0');
        setAverageFee(formattedAverageFee);

        const formattedAverageBlockTime = numeral(metadata.avgBlockTimes).format('0');
        setAverageBlockTime(formattedAverageBlockTime);
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
                    <TopBarItem label="Total Txns" value={totalTransactions} />
                    <TopBarItem label="Avg Txns / Sec" value={averageTxPerSecond} />
                    <TopBarItem label="Hash Rate" value={hashRate} />
                    <TopBarItem label="Avg Fee" value={averageFee} />
                    <TopBarItem label="Avg Block Time (Sec)" value={averageBlockTime} />
                    <TopBarItem label="Block Height" value={blockHeight} />
                </div>
            </div>
        </div>
    );
}
