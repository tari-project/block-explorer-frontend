import React, { useEffect, useState } from 'react';
import './HeroGraph.scss';
import { ReactComponent as LoadingBars } from '../../assets/bars.svg';
import { connect } from 'react-redux';
import { leftPad } from '../../helpers/leftPad';
import * as timeago from 'timeago.js';
import { Link } from 'react-router-dom';
import { fmtMSS } from '../../helpers/fmtMSS';
import { BlocksEntity } from '../../types/Blocks';

interface Props {
    blocks: BlocksEntity[];
    data?: number[];
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
    miningTime: number;
    hash: string;
}

const dimensions = {
    width: 900,
    height: 180,
    margin: 10,
    elementSize: 4
} as const;

function getHighest(values: Array<HeightBar>): HeightBar {
    const maxHeights: HeightBar = {
        inputs: 0,
        kernels: 0,
        outputs: 0,
        total: 0,
        blockHeight: 0,
        timestamp: 0,
        miningTime: 0,
        hash: ''
    };
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
    const [latestBlocks, setLatestBlocks] = useState<BlocksEntity[]>([]);
    const [firstChildClass, setFirstChildClass] = useState('');
    useEffect(() => {
        setLatestBlocks(blocks);
        setFirstChildClass('animate');
    }, [blocks]);

    const { width, height } = dimensions;

    const blocksData: HeightBar[] = latestBlocks.map((block) => {
        const { body, header, _miningTime } = block.block;

        const inputs = body.inputs.length;
        const outputs = body.outputs.length;
        const kernels = body.kernels.length;
        const heights = header.height;
        const timestamp = header.timestamp.seconds;
        const miningTime = _miningTime;
        const hash = header.hash;

        return {
            inputs: inputs,
            outputs: outputs,
            kernels: kernels,
            total: inputs + outputs + kernels,
            blockHeight: heights,
            timestamp: timestamp,
            miningTime: miningTime,
            hash: hash
        };
    });

    const maxHeights = getHighest(blocksData);
    function renderYAxis(maxHeights: HeightBar) {
        const nums: React.SVGProps<SVGGElement>[] = [];
        let ticks = yAxisTicks + 1;

        for (let i = 0; i < yAxisTicks + 1; i++) {
            ticks--;

            const displayNum = Math.round((maxHeights.total / yAxisTicks) * ticks);
            const elem: React.SVGProps<SVGGElement> = (
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
            ) as React.SVGProps<SVGGElement>;
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
    miningTime: number;
    aniClass: string;
    hash: string;
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
        const { inputs, outputs, kernels, blockHeight, timestamp, hash, miningTime } = heights;
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
            miningTime: miningTime,
            total: 0,
            hash: hash
        };
    }

    if (values.length < 1) {
        return <LoadingBars className="fill-color-highlight" />;
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
                        miningTime={heights.miningTime}
                        aniClass={aniClass}
                        hash={heights.hash}
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
    miningTime,
    timestamp,
    aniClass,
    hash
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
        if (value === 1) {
            text = `${value} ${type}`;
        } else {
            text = `${value} ${type}s`;
        }
        return leftPad(text, 14, ' ');
    }

    const timeAgo = timeago.format(timestamp * 1000);

    return (
        <Link to={`/block/${hash}`} key={blockHeight} className={`overviewBars ${aniClass}`}>
            <g className="tooltip total" transform={`translate(${offset - 70},${height - totalHeight - 50})`}>
                <rect rx="3" />
                <text x="60" y="10" xmlSpace="preserve" textAnchor="end">
                    <tspan className="timeAgo" x="60" dy="0">
                        {leftPad(timeAgo, 14, ' ')}
                    </tspan>
                    <tspan className="blockHeight" x="60" dy="14">
                        {leftPad(`${blockHeight}`, 14, ' ')}
                    </tspan>
                    <tspan className="inputs" x="60" dy="12">
                        {getTooltipText(inputsVal, 'input')}
                    </tspan>
                    <tspan className="outputs" x="60" dy="10">
                        {getTooltipText(outputsVal, 'output')}
                    </tspan>
                    <tspan className="kernels" x="60" dy="10">
                        {getTooltipText(kernelsVal, 'kernel')}
                    </tspan>
                    <tspan className="timeAgo" x="60" dy="10">
                        {leftPad(fmtMSS(miningTime), 14, ' ')}
                    </tspan>
                </text>
            </g>
            <g id="kernels">
                <rect
                    className="hero-kernels"
                    width={elementSize}
                    height={kernelHeight}
                    x={offset}
                    y={height - kernelHeight}
                />
            </g>
            <g id="outputs">
                <rect
                    className="hero-outputs"
                    width={elementSize}
                    height={outputHeight}
                    x={offset}
                    y={height - barPos1}
                />
            </g>
            <g id="inputs">
                <rect
                    className="hero-inputs"
                    transform={`rotate(180 ${offset + elementSize / 2} ${height - barPos2 + inputsHeight / 2})`}
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
        </Link>
    );
}

const mapStateToProps = (state) => ({
    blocks: state.blocks
});
export default connect(mapStateToProps)(HeroGraph);
