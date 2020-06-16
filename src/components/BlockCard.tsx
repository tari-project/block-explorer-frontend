import React from 'react';
import './BlockCard.css';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';

function fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
}
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
        <Link to={`/block/${hash}`}>
            <div key={height} className="BlockCard slideIn">
                <Header blockHeight={heightStr} date={date} timeAgo={timeAgo} />
                <div className="BlockCard-stats">
                    <StatBox color="yellow" label="# of Transactions" value={kernels.length} />
                    <StatBox color="blue" label="Mining Time" value={miningTime} />
                    <StatBox color="purple" label="Block Size" value={size} />
                </div>
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

type StatBoxColor = 'yellow' | 'blue' | 'purple';

const statBoxColors: {
    [color in StatBoxColor]: {
        backgroundColor: string;
        color: string;
    };
} = {
    yellow: {
        backgroundColor: '#fceee4',
        color: '#bc9b84'
    },
    blue: {
        backgroundColor: '#e4f5fc',
        color: '#90aab4'
    },
    purple: {
        backgroundColor: '#fce4f6',
        color: '#b490ae'
    }
};

interface StatBoxProps {
    color: StatBoxColor;
    label: string;
    value: string;
}

function StatBox({ color, label, value }: StatBoxProps) {
    return (
        <div style={statBoxColors[color]} className="BlockCard-StatBox">
            <div className="BlockCard-StatBox-value">{value}</div>
            <div className="BlockCard-StatBox-label">{label}</div>
        </div>
    );
}
