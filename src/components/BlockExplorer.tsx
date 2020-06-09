import React from 'react';
import './BlockExplorer.css';
import PlainGraphTitle from './GraphTitles/PlainGraphTitle';
import EstimatedHashGraph from './EstimatedHashGraph';
import Hero from './Hero';
import HeroGraph from './Graphs/HeroGraph';
import LatestBlocks from './LatestBlocks';
import CirculatingTariGraph from "./CirculatingTariGraph";

const hashRateData = [
    50,
    210,
    20,
    90,
    50,
    80,
    60,
    90,
    70,
    150,
    180,
    120,
    50,
    210,
    20,
    90,
    50,
    80,
    60,
    90,
    70,
    150,
    180,
    120,
    50,
    210,
    20,
    90,
    50,
    80,
    60,
    90,
    70,
    150,
    180,
    120
];

export default function BlockExplorer({ difficulty }: { difficulty: any[] }) {
    return (
        <div className="BlockExplorer">
            <Hero>
                <PlainGraphTitle title="Blocks Overview" />
                <div className="blocksOverview">
                    <HeroGraph width={570} height={220} yAxisTicks={4} data={hashRateData} />
                </div>

                <PlainGraphTitle title="Latest Blocks" />
                <LatestBlocks />
            </Hero>
            <div className="twoCol">
                <EstimatedHashGraph data={difficulty} />
                <CirculatingTariGraph />
            </div>
        </div>
    );
}
