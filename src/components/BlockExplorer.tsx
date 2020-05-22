import React from 'react';
import BlockCard from './BlockCard';
import './BlockExplorer.css';
import SimpleBarGraph from './Graphs/SimpleBarGraph';
import PlainGraphTitle from './GraphTitles/PlainGraphTitle';
import PolygonGraph from './Graphs/PolygonGraph';

const barGraphData = [
    2,
    4,
    5,
    6,
    7,
    8,
    9,
    11,
    14,
    15,
    16,
    20,
    20,
    22,
    23,
    25,
    27,
    29,
    30,
    31,
    32,
    33,
    33,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    42,
    44,
    44,
    46,
    47
];

const hashRateData = [0, 220, 20, 90, 50, 80, 60, 90, 70, 150, 180, 120];

export default function BlockExplorer() {
    return (
        <div className="BlockExplorer">
            <PlainGraphTitle title="Latest Blocks" />
            <BlockCard />
            <div className="twoCol">
                <PolygonGraph width={510} height={220} yAxisTicks={6} data={hashRateData} />
                <SimpleBarGraph width={510} height={220} yAxisTicks={6} data={barGraphData} />
            </div>
        </div>
    );
}
