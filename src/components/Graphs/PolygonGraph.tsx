import React from 'react';
import './PolygonGraph.css';
import PlainGraphTitle from '../GraphTitles/PlainGraphTitle';
import BackgroundLinesWithAxes from './BackgroundLinesWithAxes';

interface Props {
    data: number[];
    width: number;
    height: number;
    yAxisTicks: number;
}

export default function PolygonGraph({ width, height, data, yAxisTicks }: Props) {
    return (
        <div className="graphWrapper">
            <PlainGraphTitle
                title="Network Difficulty"
                subTitle="How difficult it is to mine a new block for the Tari blockchain."
            />
            <BackgroundLinesWithAxes height={height} width={width} yAxisTicks={yAxisTicks} data={data}>
                <polyline rx="3" points={data.join(' ')} style={{ fill: '#F0EFF6', stroke: '#352583', strokeWidth: 2 }} />
            </BackgroundLinesWithAxes>
        </div>
    );
}
