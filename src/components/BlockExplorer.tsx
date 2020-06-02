import React from 'react';
import BlockCard from './BlockCard';
import './BlockExplorer.css';
import SimpleBarGraph from './Graphs/SimpleBarGraph';
import PlainGraphTitle from './GraphTitles/PlainGraphTitle';
import PolygonGraph from './Graphs/PolygonGraph';
import Hero from './Hero';
import HeroGraph from './Graphs/HeroGraph';

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

export default function BlockExplorer() {
    return (
        <div className="BlockExplorer">
            <Hero>
                <PlainGraphTitle title="Blocks Overview" />
                <div className="blocksOverview">
                    <HeroGraph width={570} height={220} yAxisTicks={4} data={barGraphData} />
                </div>

                <PlainGraphTitle title="Latest Blocks" />
                <div className="latestBlocksContainer">
                    <BlockCard />
                    <BlockCard />
                    <BlockCard />
                    <BlockCard />
                    <BlockCard />
                </div>
            </Hero>
            <div className="twoCol">
                <PolygonGraph width={500} height={220} yAxisTicks={6} />

                <SimpleBarGraph width={500} height={220} yAxisTicks={6} />
            </div>
        </div>
    );
}
