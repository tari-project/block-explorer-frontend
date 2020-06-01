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
        const meta = {
            "chainRunningTime": {
                "runningTimeMillis": 2992858000
            },
            "hashRate": "3.5",
            "averageFee": "0.05",
            "averageBlockTime": "215"
        };
        const metadata = await fetchChainMetadata();

        const formattedBlockHeight = numeral(metadata.blockHeight).format('0.0a');
        setBlockHeight(formattedBlockHeight);

        const formattedTotalTransactions = numeral(metadata.totalTransactions).format('0.0a');
        setTotalTransactions(formattedTotalTransactions);

        const calcAverageTxPerSecond = metadata.totalTransactions / (meta.chainRunningTime.runningTimeMillis / 1000);
        const formattedCalcAverageTxPerSecond = numeral(calcAverageTxPerSecond).format('0.000');
        setAverageTxPerSecond(formattedCalcAverageTxPerSecond);

        const formattedHashRate = numeral(meta.hashRate).format('0.0') + "TH";
        setHashRate(formattedHashRate);

        const formattedAverageFee = numeral(meta.averageFee).format('0.00');
        setAverageFee(formattedAverageFee);

        const formattedAverageBlockTime = numeral(meta.averageBlockTime).format('0:00:00');
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
                    <TopBarItem label="Average Txns/second" value={averageTxPerSecond} />
                    <TopBarItem label="Hash Rate" value={hashRate} />
                    <TopBarItem label="Average Fee" value={averageFee} />
                    <TopBarItem label="Average Block Time" value={averageBlockTime} />
                    <TopBarItem label="Current Block Height" value={blockHeight} />
                </div>
            </div>
        </div>
    );
}
