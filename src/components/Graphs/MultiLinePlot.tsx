import * as d3 from 'd3';
import React from 'react';
import './PolygonGraph.scss';
import PlainGraphTitle from '../GraphTitles/PlainGraphTitle';
import numeral from 'numeral';

interface Props {
    data: any[];
    width: number;
    height: number;
    yAxisTicks: number;
    yAxisLabel: string;
    xAxisLabel: string;
}

export default function MultiLinePlot({ width, height, yAxisTicks, data, xAxisLabel, yAxisLabel }: Props) {
    const YHighestNum = Math.max(...data.map((o) => o.y));
    const XHighestNumber = Math.max(...data.map((o) => o.x));
    const XLowestNumber = Math.min(...data.map((o) => o.x));
    const xScale = d3.scaleLinear().domain([XHighestNumber, XLowestNumber]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, YHighestNum]).range([height, 0]);

    //Todo: Data needs to be padded (last known value per algo copied where there are gaps) to prevent only line segments being rendered.

    const Sha3Difficulties = data.filter(function (item) {
        return item.group === '2';
    });
    const MoneroDifficulties = data.filter(function (item) {
        return item.group === '0';
    });

    const transformedMoneroData: any = MoneroDifficulties.map((d, i) => {
        return {
            x: xScale(d.x),
            y: yScale(d.y),
            blockHeight: d.x
        };
    });

    const transformedSha3Data: any = Sha3Difficulties.map((d, i) => {
        return {
            x: xScale(d.x),
            y: yScale(d.y),
            blockHeight: d.x
        };
    });

    const xMoneroAccessor = (transformedMoneroData: any) => transformedMoneroData.x;
    const yMoneroAccessor = (transformedMoneroData: any) => transformedMoneroData.y;
    const xSha3Accessor = (transformedSha3Data: any) => transformedSha3Data.x;
    const ySha3Accessor = (transformedSha3Data: any) => transformedSha3Data.y;

    const lineGeneratorSha3: any = d3.line().x(xSha3Accessor).y(ySha3Accessor);
    const lineGeneratorMonero: any = d3.line().x(xMoneroAccessor).y(yMoneroAccessor);

    function round5({ num }: { num: any }) {
        return Math.ceil(num / 5) * 5;
    }

    function renderYAxis() {
        const nums: Array<any> = [];
        let ticks = yAxisTicks + 1;

        for (let i = 0; i < yAxisTicks + 1; i++) {
            ticks--;

            const num = YHighestNum === Number.NEGATIVE_INFINITY ? 0 : (YHighestNum / yAxisTicks) * ticks;
            const displayNum = round5({ num });
            nums.push(
                <g key={i}>
                    <text
                        style={{ fontFamily: 'Avenir, sans-serif', fontSize: 14, display: 'block' }}
                        key={`${i}-text`}
                        fill="#adadad"
                        x={-30}
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
        for (let i = 0; i < data.length; i += 10) {
            nums.push(
                <div key={i} className="tick">
                    {data[i].x}
                </div>
            );
        }
        return nums;
    }

    return (
        <div className="graphWrapper networkHashrateGraph">
            <PlainGraphTitle title="Network Difficulty" subTitle={`How hard it is to mine a block on the network.`} />
            <svg
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                className="networkDifficultyPaths"
                height={height}
                width={width}
            >
                <g className="yAxisLabel">
                    <text style={{ fontFamily: 'Avenir, sans-serif', fontSize: 11 }} fill="#bababa" x={-120} y={-40}>
                        {yAxisLabel}
                    </text>
                </g>
                {renderYAxis()}
                <path
                    style={{ fill: 'none', stroke: '#ff6600', strokeWidth: 2 }}
                    d={lineGeneratorMonero(transformedMoneroData)}
                />
                {transformedMoneroData.map((item, i) => {
                    return (
                        <g key={i} className="shapeHolder">
                            <circle cx={item.x} cy={item.y} r="15" fill="#352583" fillOpacity="0" />
                            <g className="tooltip" opacity="0.9">
                                <rect rx={3} x={item.x - 20} y={item.y - 20} width="25" />
                                <text x={item.x - 16} y={item.y - 7}>
                                    {numeral(data[i].y || 0).format('0a')}
                                </text>
                            </g>
                            <g className="tooltip blockHeightTooltip" opacity="0.9">
                                <rect rx={3} x={item.x - 35} y={item.y - 45} width="40" />
                                <text x={item.x - 31} y={item.y - 32}>
                                    {item.blockHeight}
                                </text>
                            </g>
                        </g>
                    );
                })}

                <path
                    style={{ fill: 'none', stroke: '#352583', strokeWidth: 2 }}
                    d={lineGeneratorSha3(transformedSha3Data)}
                />
                {transformedSha3Data.map((item, i) => {
                    return (
                        <g key={i} className="shapeHolder">
                            <circle cx={item.x} cy={item.y} r="15" fill="#352583" fillOpacity="0" />
                            <g className="tooltip" opacity="0.9">
                                <rect rx={3} x={item.x - 20} y={item.y - 20} width="25" />
                                <text x={item.x - 16} y={item.y - 7}>
                                    {numeral(data[i].y || 0).format('0a')}
                                </text>
                            </g>
                            <g className="tooltip blockHeightTooltip" opacity="0.9">
                                <rect rx={3} x={item.x - 35} y={item.y - 45} width="40" />
                                <text x={item.x - 31} y={item.y - 32}>
                                    {item.blockHeight}
                                </text>
                            </g>
                        </g>
                    );
                })}
            </svg>
            <div className="xAxisDate">{renderXAxis()}</div>
            <div className="xAxisLabel">{xAxisLabel}</div>
        </div>
    );
}
