import React, { useEffect, useState } from 'react';
import './HeroGraph.css';
import { ReactComponent as Bars } from '../../assets/bars.svg';
import { connect } from 'react-redux';
import { leftPad } from '../../helpers/leftPad';
import * as timeago from 'timeago.js';

interface Props {
    blocks: any[];
    data: number[];
    width: number;
    height: number;
    yAxisTicks: number;
}

interface HeightBar {
    blockHeight: number;
    inputs: number;
    outputs: number;
    kernels: number;
    total: number;
    timestamp: number;
}

const dimensions = {
    width: 900,
    height: 280,
    margin: 10,
    elementSize: 4
} as const;

function getHighest(values: Array<HeightBar>): HeightBar {
    const maxHeights: HeightBar = { inputs: 0, kernels: 0, outputs: 0, total: 0, blockHeight: 0, timestamp: 0 };
    values.forEach((values: HeightBar) => {
        const keys = ['inputs', 'outputs', 'kernels', 'total'];
        keys.forEach((key) => {
            if (values[key] > maxHeights[key]) {
                maxHeights[key] = values[key];
            }
        });
    });
    return maxHeights;
}
// can add this back in if the data changes & we need to round to 5
// it is currently low so rounding to 5 looks inaccurate
// function round5({ num }: { num: any }) {
//     return Math.ceil(num / 5) * 5;
// }

function HeroGraph({ yAxisTicks, blocks }: Props) {
    const [latestBlocks, setLatestBlocks] = useState([] as any);
    const [firstChildClass, setFirstChildClass] = useState('');
    useEffect(() => {
        setLatestBlocks(blocks);
        setFirstChildClass('animate');
    }, [blocks]);

    const { width, height } = dimensions;

    const blocksData: HeightBar[] = latestBlocks.map((block) => {
        const { body, header } = block.block;

        const inputs = body.inputs.length;
        const outputs = body.outputs.length;
        const kernels = body.kernels.length;
        const heights = header.height;
        const timestamp = header.timestamp.seconds;
        return {
            inputs: inputs,
            outputs: outputs,
            kernels: kernels,
            total: inputs + outputs + kernels,
            blockHeight: heights,
            timestamp: timestamp
        };
    });

    const maxHeights = getHighest(blocksData);
    function renderYAxis(maxHeights: HeightBar) {
        const nums: any[] = [];
        let ticks = yAxisTicks + 1;

        for (let i = 0; i < yAxisTicks + 1; i++) {
            ticks--;

            const displayNum = Math.round((maxHeights.total / yAxisTicks) * ticks);
            const elem: any = (
                <g key={i}>
                    <text
                        className="heroYAxisText"
                        key={`${i}-text`}
                        fill="#adadad"
                        x={-20}
                        y={(height / yAxisTicks) * i}
                    >
                        {displayNum}
                    </text>

                    <line
                        key={`${i}-line`}
                        width={width}
                        stroke="#adadad"
                        strokeWidth={0.5}
                        x1={0}
                        x2={width + 10}
                        y1={(height / yAxisTicks) * i}
                        y2={(height / yAxisTicks) * i}
                    />
                </g>
            ) as any;
            nums.push(elem);
        }
        return nums;
    }

    function renderXAxis() {
        const nums: Array<any> = [];
        for (let i = 0; i < blocksData.length; i += 10) {
            nums.push(
                <div key={i} className="tick">
                    {blocksData[i].blockHeight}
                </div>
            );
        }
        return nums;
    }
    return (
        <div className="HeroGraphContainer">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                className="heroBars"
                height={height}
                width={width}
            >
                <g>{renderYAxis(maxHeights)}</g>

                <Chart values={blocksData} maxHeights={maxHeights} aniClass={firstChildClass} />
            </svg>
            <div className="xAxisTimes">{renderXAxis()}</div>
        </div>
    );
}

interface GraphicalElementProps {
    inputs: number;
    outputs: number;
    kernels: number;
    inputsVal: number;
    outputsVal: number;
    kernelsVal: number;
    offset: number;
    maxHeights: HeightBar;
    blockHeight: number;
    timestamp: number;
    aniClass: string;
}

function Chart({
    values,
    maxHeights,
    aniClass
}: {
    values: Array<HeightBar>;
    maxHeights: HeightBar;
    aniClass: string;
}) {
    const { width, margin } = dimensions;
    const spaceBetweenBars = width / values.length;
    function relativeHeight(heights: HeightBar, maxHeights: HeightBar): HeightBar {
        const { inputs, outputs, kernels, blockHeight, timestamp } = heights;
        const { total: maxTotal } = maxHeights;

        let inputPercent = maxTotal > 0 ? inputs / maxTotal : inputs;
        let outputPercent = maxTotal > 0 ? outputs / maxTotal : outputs;
        let kernelsPercent = maxTotal > 0 ? kernels / maxTotal : kernels;

        if (maxTotal > 0) {
            inputPercent = inputs / maxTotal;
            outputPercent = outputs / maxTotal;
            kernelsPercent = kernels / maxTotal;
        }

        return {
            inputs: inputPercent,
            outputs: outputPercent,
            kernels: kernelsPercent,
            blockHeight: blockHeight,
            timestamp: timestamp,
            total: 0
        };
    }

    if (values.length < 1) {
        return <Bars />;
    }

    return (
        <g transform={`translate(${margin}, 0)`}>
            {values.map((heights, i) => {
                const offset = i * spaceBetweenBars;
                const { inputs, outputs, kernels } = relativeHeight(heights, maxHeights);

                return (
                    <Bar
                        key={i}
                        offset={offset}
                        inputs={inputs}
                        outputs={outputs}
                        kernels={kernels}
                        inputsVal={heights.inputs}
                        outputsVal={heights.outputs}
                        kernelsVal={heights.kernels}
                        maxHeights={maxHeights}
                        blockHeight={heights.blockHeight}
                        timestamp={heights.timestamp}
                        aniClass={aniClass}
                    />
                );
            })}
        </g>
    );
}
function Bar({
    kernels: kernelsPercent,
    outputs: outputsPercent,
    inputs: inputsPercent,
    offset,
    inputsVal,
    outputsVal,
    kernelsVal,
    blockHeight,
    timestamp,
    aniClass
}: GraphicalElementProps) {
    const { height, elementSize } = dimensions;
    const kernelHeight = kernelsPercent * height;
    const outputHeight = outputsPercent * height;
    const inputsHeight = inputsPercent * height;

    const totalHeight = inputsHeight + kernelHeight + outputHeight;

    const barPos1 = outputHeight + kernelHeight;
    const barPos2 = barPos1 + inputsHeight;

    function getTooltipText(value, type) {
        let text = '';
        if (value > 1) {
            text = `${value} ${type}s`;
        } else {
            text = `${value} ${type}`;
        }
        return leftPad(text, 13, ' ');
    }

    const timeAgo = timeago.format(timestamp * 1000);

    return (
        <g key={blockHeight} className={`overviewBars ${aniClass}`}>
            <g className="tooltip total" transform={`translate(${offset - 30},${height - totalHeight - 30})`}>
                <rect rx="3" />
                <text x="4" y="10" xmlSpace="preserve" textAnchor="start">
                    {leftPad(timeAgo, 14, ' ')}
                </text>
            </g>
            <g id="kernels">
                <g className="tooltip" transform={`translate(${offset - 65},${height - kernelHeight - 20})`}>
                    <rect rx="3" />
                    <text x="0" xmlSpace="preserve" textAnchor="start" y="11">
                        {getTooltipText(kernelsVal, 'kernel')}
                    </text>
                </g>
                <rect fill="#9330FF" width={elementSize} height={kernelHeight} x={offset} y={height - kernelHeight} />
            </g>
            <g id="outputs">
                <g className="tooltip" transform={`translate(${offset - 65},${height - barPos1 - 10})`}>
                    <rect rx="3" />
                    <text x="0" xmlSpace="preserve" textAnchor="start" y="11">
                        {getTooltipText(outputsVal, 'output')}
                    </text>
                </g>
                <rect fill="#B4C9F5" width={elementSize} height={outputHeight} x={offset} y={height - barPos1} />
            </g>
            <g id="inputs">
                <g className="tooltip" transform={`translate(${offset - 65},${height - barPos2 - 5})`}>
                    <rect rx="3" />
                    <text x="0" xmlSpace="preserve" textAnchor="start" y="11">
                        {getTooltipText(inputsVal, 'input')}
                    </text>
                </g>
                <rect
                    transform={`rotate(180 ${offset + elementSize / 2} ${height - barPos2 + inputsHeight / 2})`}
                    fill="#FF7630"
                    width={elementSize}
                    height={inputsHeight}
                    x={offset}
                    y={height - barPos2}
                >
                    <animate
                        attributeName="height"
                        attributeType="XML"
                        type="rotate"
                        values={`0;${inputsHeight}`}
                        dur="1.5s"
                        repeatCount="1"
                    />
                </rect>
            </g>
        </g>
    );
}

const mapStateToProps = (state) => ({
    blocks: state.blocks
});
export default connect(mapStateToProps)(HeroGraph);
