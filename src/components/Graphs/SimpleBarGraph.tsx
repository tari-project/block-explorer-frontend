import React from 'react';
import './SimpleBarGraph.css';
import { scaleLinear } from 'd3-scale';
import PlainGraphTitle from '../GraphTitles/PlainGraphTitle';
import numeral from 'numeral';
import config from '../../config';
const { tokenName } = config;

interface Props {
    data: any[];
    width: number;
    height: number;
    yAxisTicks: number;
}
export default function SimpleBarGraph({ width, height, data, yAxisTicks }: Props) {
    const yScale = scaleLinear()
        .domain([0, Math.max(...data)])
        .range([height, 0]);
    const barWidth = Math.floor(width / data.length);

    const highestNum = Math.max(...data);

    function round5({ num }: { num: any }) {
        return Math.ceil(num / 5) * 5;
    }

    function renderYAxis() {
        const nums: Array<any> = [];
        let ticks = yAxisTicks + 1;

        for (let i = 0; i < yAxisTicks + 1; i++) {
            ticks--;

            const displayNum = round5({ num: (highestNum / yAxisTicks) * ticks });
            nums.push(
                <g key={i}>
                    <text
                        style={{ fontFamily: 'Avenir, sans-serif', fontSize: 14 }}
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

    const title = `Circulating ${tokenName}`;
    return (
        <div className="graphWrapper">
            <PlainGraphTitle
                title={title}
                subTitle={`Total number of mined ${tokenName} circulating on the network.`}
            />

            <svg className="circulateSimpleBars" height={height} width={width}>
                {renderYAxis()}

                {data.map((total, i) => {
                    return (
                        <g key={i} className="barHolder">
                            <g
                                className="tooltip"
                                transform={`translate(${i * barWidth - 30},${yScale(total) - 30})`}
                                opacity="0.9"
                            >
                                <rect rx="5" width="35" height="22" />
                                <text x="5" y="16">
                                    {numeral(total).format('0a')}
                                </text>
                            </g>
                            <rect
                                rx="3"
                                className="bar"
                                x={i * barWidth}
                                y={yScale(total)}
                                width={barWidth / 2}
                                height={height - yScale(total)}
                            />
                        </g>
                    );
                })}
            </svg>
            <div className="xAxisDate" style={{ width: width - 50 }}>
                <div className="tick">4 weeks ago</div>
                <div className="tick">3 weeks ago</div>
                <div className="tick">2 weeks ago</div>
                <div className="tick">a week ago</div>
            </div>
        </div>
    );
}
