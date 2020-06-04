import React from 'react';
import BlockCard from './BlockCard';
import './BlockExplorer.css';
import SimpleBarGraph from './Graphs/SimpleBarGraph';
import PlainGraphTitle from './GraphTitles/PlainGraphTitle';
import PolygonGraph from './Graphs/PolygonGraph';
import Hero from './Hero';
import HeroGraph from "./Graphs/HeroGraph";

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

export default function BlockExplorer({ blocks, difficulty }: { blocks: any[], difficulty: any[] }) {
    return (
        <div className="BlockExplorer">
            <Hero>
                <PlainGraphTitle title="Blocks Overview" />
                <div className="blocksOverview">
                    <HeroGraph width={570} height={220} yAxisTicks={4} blocks={blocks} data={hashRateData} />
                </div>

                <PlainGraphTitle title="Latest Blocks" />
                <div className="latestBlocksContainer">
                    {blocks.slice(0, 5).map((block, i) => (
                        <BlockCard key={i} block={block} />
                    ))}
                </div>
            </Hero>
            <div className="twoCol">
                <PolygonGraph width={500} height={220} yAxisTicks={6} data={difficulty} />

                <SimpleBarGraph width={500} height={220} yAxisTicks={6} />
            </div>
        </div>
    );
}
