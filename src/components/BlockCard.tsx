import React from 'react';
import './BlockCard.scss';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import { fmtMSS } from '../helpers/fmtMSS';

export default function BlockCard({ block }: { block: any }) {
    const {
        _miningTime,
        _weight,
        header: { hash, height, timestamp },
        body: { kernels }
    } = block.block;
    const date = new Date(timestamp.seconds * 1000).toLocaleString();
    const timeAgo = timeago.format(timestamp.seconds * 1000);
    const heightStr = numeral(height).format('0,0');
    const size = numeral(_weight).format('0,0');
    const miningTime = fmtMSS(_miningTime);
    return (
        <Link to={`/block/${hash}`} key={height} className="BlockCard slideIn">
            <Header blockHeight={heightStr} date={date} timeAgo={timeAgo} />
            <div className="BlockCard-stats">
                <StatBox statBoxClass="transactions" label="# of Transactions" value={kernels.length} />
                <StatBox statBoxClass="mining" label="Mining Time" value={miningTime} />
                <StatBox statBoxClass="block" label="Block Size" value={size} />
            </div>
        </Link>
    );
}

interface HeaderProps {
    blockHeight: string;
    date: string;
    timeAgo: string;
}

function Header({ blockHeight, date, timeAgo }: HeaderProps) {
    return (
        <div className="BlockCard-Header">
            <h1>Block {blockHeight}</h1>
            <h2 title={date}>{timeAgo}</h2>
        </div>
    );
}


interface StatBoxProps {
    statBoxClass: string;
    value: string;
    label: string;
}

function StatBox({ statBoxClass, label, value }: StatBoxProps) {

    let themeClass: string = "BlockCard-StatBox " + statBoxClass;

    return (
        <div className={themeClass}>
            <div className="BlockCard-StatBox-value">{value}</div>
            <div className="BlockCard-StatBox-label">{label}</div>
        </div>
    );
}
