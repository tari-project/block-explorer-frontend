import React from 'react';
import './SimpleBarGraph.css';
import { scaleLinear } from 'd3-scale';
import PlainGraphTitle from '../GraphTitles/PlainGraphTitle';
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

    const xAxisTicks: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'];

    return (
        <div className="graphWrapper">
            <PlainGraphTitle
                title="Circulating Tari"
                subTitle="Total number of mined Tari circulating on the network."
            />

            <BackgroundLinesWithAxes
                height={height}
                width={width}
                yAxisTicks={yAxisTicks}
                xAxisTicks={xAxisTicks}
                data={data}
            >
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
