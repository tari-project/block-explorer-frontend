import React from 'react';
import './BlockCard.css';
import BlockChart from './BlockChart';
import numeral from 'numeral';
import { Constants } from '../helpers/api';
function fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
}
export default function BlockCard({ block, constants }: { block: any; constants: Constants }) {
    const {
        _miningTime,
        header: { height, timestamp },
        body: { kernels, inputs, outputs }
    } = block.block;
    const date = new Date(timestamp.seconds * 1000).toLocaleString();
    const heightStr = numeral(height).format('0,0');
    const size = numeral(
        kernels.length * constants.block_weight_kernels +
            inputs.length * constants.block_weight_inputs +
            outputs.length * constants.block_weight_outputs
    ).format('0,0');
    const miningTime = fmtMSS(_miningTime);
    return (
        <div className="BlockCard">
            <Header blockHeight={heightStr} date={date} />
            <div className="BlockCard-chart">
                <BlockChart />
            </div>
            <div className="BlockCard-ticks">
                <div>0:00</div>
                <div>0:30</div>
                <div>1:00</div>
                <div>1:30</div>
                <div>1:48</div>
            </div>
            <div className="BlockCard-stats">
                <StatBox color="yellow" label="# of Transactions" value={kernels.length} />
                <StatBox color="blue" label="Mining Time" value={miningTime} />
                <StatBox color="purple" label="Block Size" value={size} />
            </div>
        </div>
    );
}

interface HeaderProps {
    blockHeight: string;
    date: string;
}

function Header({ blockHeight, date }: HeaderProps) {
    return (
        <div className="BlockCard-Header">
            <h1>Block {blockHeight}</h1>
            <h2>{date}</h2>
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
