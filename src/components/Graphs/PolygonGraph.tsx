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
    const YHighestNum = Math.max.apply(
        Math,
        data.map(function (o) {
            return o.y;
        })
    );
    const XHighestNumber = Math.max.apply(
        Math,
        data.map(function (o) {
            return o.x;
        })
    );

    const xScale = d3.scaleLinear().domain([0, XHighestNumber]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, YHighestNum]).range([height, 0]);
    const transformedData = data.map((d, i) => {
        return {
            x: xScale(d.x),
            y: yScale(d.y)
        };
    });

    const xAccessor = (transformedData: any) => transformedData.x;
    const yAccessor = (transformedData: any) => transformedData.y;

    const lineGenerator: any = d3.line().x(xAccessor).y(yAccessor);

    const areaGenerator: any = d3.area().x(xAccessor).y(yAccessor).y1(height);

    function round5({ num }: { num: any }) {
        return Math.ceil(num / 5) * 5;
    }

    function renderYAxis() {
        const nums: Array<any> = [];
        let ticks = yAxisTicks + 1;

        for (let i = 0; i < yAxisTicks + 1; i++) {
            ticks--;

            const displayNum = round5({ num: (YHighestNum / yAxisTicks) * ticks });
            nums.push(
                <g key={i}>
                    <text
                        style={{ fontFamily: 'Avenir, sans-serif', fontSize: 14, display: 'block' }}
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

        for (let i = 0; i < data.length + 1; i += 10) {
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
                {transformedData.map((item, i) => {
                    return (
                        <g key={i} className="barHolder">
                            <circle cx={item.x} cy={item.y} r="10" fill="#352583" fillOpacity="0" />
                            <g className="tooltip" opacity="0.9">
                                <rect x={item.x - 20} y={item.y - 20} width="35" height="22" />
                                <text x={item.x - 15} y={item.y - 5}>
                                    {numeral(data[i].y).format('0a')}
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
