import React from 'react';
import './HeroGraph.css';
import { ReactComponent as Bars } from '../../assets/bars.svg';

interface Props {
    blocks: any[];
    data: number[];
    width: number;
    height: number;
    yAxisTicks: number;
    totalMiningTimes: number;
}

interface HeightBar {
    blockHeight: number;
    miningTime: number;
    inputs: number;
    outputs: number;
    kernels: number;
    total: number;
}

const dimensions = {
    width: 1200,
    height: 300,
    margin: 10,
    elementSize: 5
} as const;

function getHighest(values: Array<HeightBar>): HeightBar {
    const maxHeights: HeightBar = { inputs: 0, kernels: 0, outputs: 0, total: 0, blockHeight: 0, miningTime: 0 };
    values.forEach((values: HeightBar) => {
        const keys = ['inputs', 'outputs', 'kernels', 'total', 'miningTime'];
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

export default function HeroGraph({ yAxisTicks, blocks, totalMiningTimes }: Props) {
    const { width, height } = dimensions;

    const blocksData: HeightBar[] = blocks.map((block) => {
        const { body, header, _miningTime } = block.block;

        const inputs = body.inputs.length;
        const outputs = body.outputs.length;
        const kernels = body.kernels.length;
        const heights = header.height;
        return {
            inputs: inputs,
            outputs: outputs,
            kernels: kernels,
            total: inputs + outputs + kernels,
            blockHeight: heights,
            miningTime: _miningTime
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
                        style={{ fontFamily: 'Avenir, sans-serif', fontSize: 14 }}
                        key={`${i}-text`}
                        fill="#adadad"
                        x={-60}
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
                        x2={width}
                        y1={(height / yAxisTicks) * i}
                        y2={(height / yAxisTicks) * i}
                    />
                </g>
            ) as any;
            nums.push(elem);
        }
        return nums;
    }

    function getTimeTicks() {
        const ticksAmount = 6;
        const today = new Date();
        const ticks: any[] = [];

        const minuteAmount = totalMiningTimes / 60 / ticksAmount; //dont know if this is fine yet

        for (let i = 0; i < ticksAmount; i++) {
            const less = today.setMinutes(today.getMinutes() - minuteAmount);
            const newt = new Date(less);
            const minutes = newt.getMinutes() < 10 ? `0${newt.getMinutes()}` : newt.getMinutes();
            const hours = newt.getHours() < 10 ? `0${newt.getHours()}` : newt.getHours();
            const time = hours + ':' + minutes;
            ticks.push(time);
        }

        return ticks;
    }
    return (
        <div>
            <svg className="heroBars" height={height} width={width}>
                <g>{renderYAxis(maxHeights)}</g>

                <Chart totalMiningTimes={totalMiningTimes} values={blocksData} maxHeights={maxHeights} />
            </svg>
            <div className="xAxisTimes" style={{ width: width }}>
                {getTimeTicks().map((time, index) => {
                    return (
                        <div key={index} className="tick">
                            {time}
                        </div>
                    );
                })}
            </div>
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
    totalMiningTimes: number;
}
function Chart({
    values,
    maxHeights,
    totalMiningTimes
}: {
    values: Array<HeightBar>;
    maxHeights: HeightBar;
    totalMiningTimes: number;
}) {
    let valuesReversed = values.sort((a,b) => b.blockHeight - a.blockHeight);
    const { width, margin, elementSize } = dimensions;

    const spaceBetweenBars = width / values.length;

    function relativeHeight(heights: HeightBar, maxHeights: HeightBar): HeightBar {
        const { inputs, outputs, kernels, blockHeight, miningTime } = heights;
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
            miningTime: miningTime,
            total: 0
        };
    }

    if (values.length < 1) {
        return <Bars />;
    }
    return (
        <g transform={`translate(${margin}, 0)`}>
            {valuesReversed.map((heights, i) => {
                const { miningTime } = heights;
                const { inputs, outputs, kernels } = relativeHeight(heights, maxHeights);

                const oneSecondSpace = (width / totalMiningTimes) * 100;

                const miningTimePer = (miningTime / width) * 100;

                const offset = i * oneSecondSpace + miningTimePer;

                console.log('mtp', miningTimePer);
                console.log('offset', offset);

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
                        totalMiningTimes={totalMiningTimes}
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
    totalMiningTimes
}: GraphicalElementProps) {
    const { height, elementSize } = dimensions;
    const kernelHeight = kernelsPercent * height;
    const outputHeight = outputsPercent * height;
    const inputsHeight = inputsPercent * height;

    const totalHeight = inputsHeight + kernelHeight + outputHeight;

    const barPos1 = outputHeight + kernelHeight;
    const barPos2 = barPos1 + inputsHeight;

    return (
        <g className="overviewBars">
            <g className="tooltip total" transform={`translate(${offset - 70},${height - totalHeight - 35})`}>
                <rect rx="5" />
                <text x="5" y="16">
                    {blockHeight}
                </text>
            </g>
            <rect fill="#9330FF" width={elementSize} height={kernelHeight} x={offset} y={height - kernelHeight} />
            <g id="kernels">
                <g className="tooltip" transform={`translate(${offset - 70},${height - kernelHeight - 25})`}>
                    <rect rx="5" />
                    <text x="5" y="16">
                        {`${kernelsVal} kernel${kernelsVal > 1 ? 's' : ''}`}
                    </text>
                </g>
                <rect fill="#9330FF" width={elementSize} height={kernelHeight} x={offset} y={height - kernelHeight} />
            </g>
            <g id="outputs">
                <g className="tooltip" transform={`translate(${offset - 70},${height - barPos1 - 10})`}>
                    <rect rx="5" />
                    <text x="5" y="16">
                        {`${outputsVal} output${outputsVal > 1 ? 's' : ''}`}
                    </text>
                </g>
                <rect fill="#B4C9F5" width={elementSize} height={outputHeight} x={offset} y={height - barPos1} />
            </g>
            <g id="inputs">
                <g className="tooltip" transform={`translate(${offset - 70},${height - barPos2 - 5})`}>
                    <rect rx="5" />
                    <text x="5" y="16">
                        {`${inputsVal} input${inputsVal > 1 ? 's' : ''}`}
                    </text>
                </g>
                <rect fill="#FF7630" width={elementSize} height={inputsHeight} x={offset} y={height - barPos2} />
            </g>
        </g>
    );
}
