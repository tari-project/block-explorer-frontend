import React, { useCallback, useEffect, useState } from 'react';
import './SimpleBarGraph.css';
import { scaleLinear } from 'd3-scale';
import PlainGraphTitle from '../GraphTitles/PlainGraphTitle';
import { fetchTokensInCirculation } from '../../api';
import numeral from 'numeral';

interface Props {
    data: number[];
    width: number;
    height: number;
    yAxisTicks: number;
}
export default function SimpleBarGraph({ width, height, data, yAxisTicks }: Props) {
    const [blockHeights, setBlockHeights] = useState(([] as unknown) as any);
    const [totalTokens, setTotalTokens] = useState(([] as unknown) as any);

    const loadCirculationData = useCallback(async () => {
        const tokenData = await fetchTokensInCirculation();
        let heightsArr: any[] = [];
        let totalsArr: number[] = [];

        tokenData.map((token) => {
            const { height, totalTokensInCirculation } = token;
            heightsArr.push(height);
            totalsArr.push(totalTokensInCirculation);
        });

        setBlockHeights(heightsArr);
        setTotalTokens(totalsArr);
    }, []);

    useEffect(() => {
        loadCirculationData().then((r) => {});
    }, [loadCirculationData]);

    const yScale = scaleLinear()
        .domain([0, Math.max(...totalTokens)])
        .range([height, 0]);
    const barWidth = Math.floor(width / totalTokens.length);

    const highestNum = Math.max(...totalTokens);

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

    return (
        <div className="graphWrapper">
            <PlainGraphTitle
                title="Circulating Tari"
                subTitle="Total number of mined Tari circulating on the network."
            />

            <svg className="circulateSimpleBars" height={height} width={width}>
                {renderYAxis()}

                {totalTokens.map((total, i) => {
                    console.log(yScale(total) * 100);
                    return (
                        <rect
                            rx="3"
                            className="bar"
                            key={i}
                            x={i * barWidth}
                            y={yScale(total)}
                            width={barWidth / 2}
                            height={height - yScale(total)}
                        />
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
