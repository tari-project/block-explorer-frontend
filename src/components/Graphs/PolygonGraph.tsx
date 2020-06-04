import * as d3 from 'd3';
import React from 'react';
import './PolygonGraph.css';
import PlainGraphTitle from '../GraphTitles/PlainGraphTitle';
import numeral from 'numeral';

interface Props {
    data: any[];
    width: number;
    height: number;
    yAxisTicks: number;
}

export default function PolygonGraph({ width, height, yAxisTicks, data }: Props) {
    let difficultyArray: any[] = [];
    data.map((item, i) => {
        const { estimated_hash_rate } = item;
        return difficultyArray.push({estimated_hash_rate, i});
    });

    const estimateHashHighestNum = Math.max.apply(Math, difficultyArray.map(function(o) { return o.estimated_hash_rate; }));
    const iHighestNumber = Math.max.apply(Math, difficultyArray.map(function(o) { return o.i; }));

    const xScale = d3
        .scaleLinear()
        .domain([0, iHighestNumber])
        .range([0, width]);
    const yScale = d3.scaleLinear().domain([0, estimateHashHighestNum]).range([height, 0]);
    const transformedData = difficultyArray.map((d, i) => {
        return {
            x: xScale(d.i),
            y: yScale(d.estimated_hash_rate)
        };
    });

    const xAccessor = (transformedData: any) => transformedData.x;
    const yAccessor = (transformedData: any) => transformedData.y;

    const lineGenerator: any = d3.line().x(xAccessor).y(yAccessor);

    const areaGenerator: any = d3.area()
        .x(xAccessor)
        .y(yAccessor)
        .y1(height);

    function round5({ num }: { num: any }) {
        return Math.ceil(num / 5) * 5;
    }

    function renderYAxis() {
        const nums: Array<any> = [];
        let ticks = yAxisTicks + 1;

        for (let i = 0; i < yAxisTicks + 1; i++) {
            ticks--;

            const displayNum = round5({ num: (estimateHashHighestNum / yAxisTicks) * ticks });
            nums.push(
                <g key={i}>
                    <text
                        style={{ fontFamily: 'Avenir, sans-serif', fontSize: 14, display: "block" }}
                        key={`${i}-text`}
                        fill="#adadad"
                        x={-50}
                        y={(height / yAxisTicks) * i}
                    >
                        {numeral(displayNum).format('0a')}
                    </text>

                    <line
                        key={`${i}-line`}
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

    function renderXAxis() {
        const nums: Array<any> = [];

        for (let i = 0; i < difficultyArray.length + 1; i+=10) {
            nums.push(
                <div key={i} className="tick">
                        {i}
                </div>
            );
        }
        return nums.sort();
    }

    return (
        <div className="graphWrapper">
            <PlainGraphTitle
                title="Network Difficulty"
                subTitle={`How difficult it is to mine a new block for the Tari blockchain.`}
            />
            <svg className="networkDifficultyPaths" height={height} width={width}>
                {renderYAxis()}
                <path style={{ fill: 'none', stroke: '#352583', strokeWidth: 2 }} d={lineGenerator(transformedData)} />
                <path style={{ fill: '#F0EFF6', opacity: 0.5, strokeWidth: 0 }} d={areaGenerator(transformedData)} />
                {transformedData.map((hash, i) => {
                    return(
                        <g key={i} className="barHolder">
                            <circle
                                cx={hash.x}
                                cy={hash.y}
                                r="10"
                                fill="#352583"
                                fillOpacity="0"
                            />
                            <g
                                className="tooltip"
                                opacity="0.9"
                            >
                                <rect x={hash.x - 20} y={hash.y - 20} width="35" height="22" />
                                <text x={hash.x - 15} y={hash.y - 5}>
                                    {numeral(difficultyArray[i].estimated_hash_rate).format('0a')}
                                </text>
                            </g>
                        </g>
                    );
                })}
            </svg>
            <div className="xAxisDate" style={{ width: width - 50 }}>
                {renderXAxis()}
            </div>
        </div>
    );
}
