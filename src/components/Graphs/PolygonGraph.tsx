import * as d3 from 'd3';
import React from 'react';
import './PolygonGraph.css';
import PlainGraphTitle from '../GraphTitles/PlainGraphTitle';
import BackgroundLinesWithAxes from './BackgroundLinesWithAxes';

const FAKE_HASH_RATE_DATA_MAX = 220;
const xAccessor = (data: any) => data.x;
const yAccessor = (data: any) => data.y;

interface Props {
    data: number[];
    width: number;
    height: number;
    yAxisTicks: number;
}

const lineGenerator: any = d3.line().x(xAccessor).y(yAccessor);

const areaGenerator: any = d3
    .area()
    .x(xAccessor)
    .y(yAccessor)
    .y0(() => FAKE_HASH_RATE_DATA_MAX)
    .y1(yAccessor);

export default function PolygonGraph({ width, height, data, yAxisTicks }: Props) {
    const xScale = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width]);
    const yScale = d3.scaleLinear().domain([0, FAKE_HASH_RATE_DATA_MAX]).range([height, 0]);
    const transformedData = data.map((d, i) => {
        return {
            x: xScale(i),
            y: yScale(d)
        };
    });

    return (
        <div className="graphWrapper">
            <PlainGraphTitle
                title="Network Difficulty"
                subTitle="How difficult it is to mine a new block for the Tari blockchain."
            />
            <BackgroundLinesWithAxes height={height} width={width} yAxisTicks={yAxisTicks} data={data}>
                <path style={{ fill: 'none', stroke: '#352583', strokeWidth: 2 }} d={lineGenerator(transformedData)} />
                <path style={{ fill: '#F0EFF6', opacity: 0.5, strokeWidth: 0 }} d={areaGenerator(transformedData)} />
            </BackgroundLinesWithAxes>
        </div>
    );
}
