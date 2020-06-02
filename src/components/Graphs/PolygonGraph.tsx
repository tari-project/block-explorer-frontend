import * as d3 from 'd3';
import React, {useCallback, useEffect, useState} from 'react';
import './PolygonGraph.css';
import PlainGraphTitle from '../GraphTitles/PlainGraphTitle';
import {fetchNetworkDifficulty} from "../../api";
import numeral from 'numeral';

interface Props {
    width: number;
    height: number;
    yAxisTicks: number;
}

export default function PolygonGraph({ width, height, yAxisTicks }: Props) {
    const [estimatedHashRate, setTotalDifficulty] = useState(([] as unknown) as any);
    const fetchNetworkDifficultyData = useCallback(async () => {
        const data = await fetchNetworkDifficulty();
        let difficultyArray: any[] = [];
        data.map((item) => {
            const { estimated_hash_rate } = item;
            return difficultyArray.push(estimated_hash_rate);
        });
        setTotalDifficulty(difficultyArray);
    }, []);

    useEffect(() => {
        fetchNetworkDifficultyData().then((r) => {});
    }, [fetchNetworkDifficultyData]);

    const highestNum = Math.max(...estimatedHashRate);

    const xScale = d3
        .scaleLinear()
        .domain([0, estimatedHashRate.length - 1])
        .range([0, width]);
    const yScale = d3.scaleLinear().domain([0, highestNum]).range([height, 0]);
    const transformedData = estimatedHashRate.map((d, i) => {
        return {
            x: xScale(i),
            y: yScale(d)
        };
    });

    const xAccessor = (estimatedHashRate: any) => estimatedHashRate.x;
    const yAccessor = (estimatedHashRate: any) => estimatedHashRate.y;

    const lineGenerator: any = d3.line().x(xAccessor).y(yAccessor);

    const areaGenerator: any = d3
        .area()
        .x(xAccessor)
        .y(yAccessor)
        .y0(() => highestNum)
        .y1(yAccessor);

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

    return (
        <div className="graphWrapper">
            <PlainGraphTitle
                title="Network Difficulty"
                subTitle="How difficult it is to mine a new block for the Tari blockchain."
            />
            <svg className="networkDifficultyPaths" height={height} width={width}>
                {renderYAxis()}
                <path style={{ fill: 'none', stroke: '#352583', strokeWidth: 2 }} d={lineGenerator(transformedData)} />
                <path style={{ fill: '#F0EFF6', opacity: 0.5, strokeWidth: 0 }} d={areaGenerator(transformedData)} />
            </svg>
        </div>
    );
}
