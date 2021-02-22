import React from 'react';
import './BlockExplorer.scss';
import PlainGraphTitle from './GraphTitles/PlainGraphTitle';
import EstimatedHashGraph from './EstimatedHashGraph';
import TargetDifficultyGraph from './TargetDifficultyGraph';
import Hero from './Hero';
import HeroGraph from './Graphs/HeroGraph';
import LatestBlocks from './LatestBlocks';
import CirculatingTokenGraph from './CirculatingTokenGraph';

export default function BlockExplorer() {
    return (
        <div className="BlockExplorer">
            <Hero>
                <PlainGraphTitle title="Blocks Overview" />
                <div className="blocksOverview">
                    <HeroGraph width={570} height={220} yAxisTicks={4} />
                </div>

                <PlainGraphTitle title="Latest Blocks" />
                <LatestBlocks />
            </Hero>
            <div className="twoCol">
                <EstimatedHashGraph />
                <CirculatingTokenGraph />
            </div>
            <div className="twoCol">
                <TargetDifficultyGraph />
            </div>
        </div>
    );
}
