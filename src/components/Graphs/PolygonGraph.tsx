import React from 'react';
import './PolygonGraph.css';
import { scaleLinear } from 'd3-scale';
import PlainGraphTitle from '../GraphTitles/PlainGraphTitle';

interface Props {
    data: number[];
    width: number;
    height: number;
    yAxisTicks: number;
}

export default function PolygonGraph({ width, height, data, yAxisTicks }: Props) {
    const yScale = scaleLinear()
        .domain([0, Math.max(...data)])
        .rangeRound([height, 0]);
    const barWidth = Math.floor(width / data.length);

    const highestNum = Math.max(...data);

    function round5({ num }: { num: any }) {
        return Math.ceil(num / 5) * 5;
    }

    function renderYAxis() {
        let nums = [];
        let ticks = yAxisTicks + 1;

        for (let i = 0; i < yAxisTicks + 1; i++) {
            ticks--;

            let displayNum = round5({ num: (highestNum / yAxisTicks) * ticks });
            nums.push(
                <g key={i}>
                    <text
                        style={{ fontFamily: 'Avenir, sans-serif', fontSize: 14 }}
                        key={i}
                        fill="#adadad"
                        x={-60}
                        y={(height / 6) * i}
                    >
                        {displayNum}k
                    </text>

                    <line
                        key={i}
                        width={width}
                        stroke="#adadad"
                        strokeDasharray="3.3"
                        strokeWidth={1}
                        x1={0}
                        x2={width}
                        y1={(height / yAxisTicks) * i}
                        y2={(height / yAxisTicks) * i}
                    />
                </g>
            );
        }
        return nums;
    }

    return (
        <div className="graphWrapper">
            <PlainGraphTitle
                title="Network Difficulty"
                subTitle="How difficult it is to mine a new block for the Tari blockchain."
            />
            <div className="graph">
                <svg className="simpleBars" width={width} height={height}>
                    <g>{renderYAxis()}</g>
                    <polyline
                        rx="3"
                        points={data.join(" ")}
                        style={{ fill: 'red', stroke: 'black', strokeWidth: 3 }}
                    />
                </svg>
                <div style={{ width: width }} className="simpleGraphXTicks">
                    <div>Jan</div>
                    <div>Feb</div>
                    <div>March</div>
                    <div>April</div>
                    <div>May</div>
                    <div>June</div>
                </div>
            </div>
        </div>
    );
}
