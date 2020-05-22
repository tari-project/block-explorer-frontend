import React from "react";
import "./SimpleBarGraph.css";
import { scaleLinear } from "d3-scale";
import PlainGraphTitle from "../GraphTitles/PlainGraphTitle";
import Dropdown from "../Dropdown";
import GraphHeader from "../GraphHeader";
import BackgroundLinesWithAxes from './BackgroundLinesWithAxes';

interface Props {
    data: number[];
    width: number;
    height: number;
    yAxisTicks: number;
}

export default function SimpleBarGraph({ width, height, data, yAxisTicks }: Props) {
    const yScale = scaleLinear()
        .domain([0, Math.max(...data)])
        .rangeRound([height, 0]);
    const barWidth = Math.floor(width / data.length);

    return (
        <div className="graphWrapper">
            <GraphHeader/>
            <BackgroundLinesWithAxes height={height} width={width} yAxisTicks={yAxisTicks} data={data}>
                {data.map((d, i) => {
                    return (
                        <rect
                            rx="3"
                            className="bar"
                            key={i}
                            x={i * barWidth}
                            y={yScale(d)}
                            width={barWidth / 2}
                            height={height - yScale(d)}
                        />
                    );
                })}
            </BackgroundLinesWithAxes>
        </div>
    );
}
