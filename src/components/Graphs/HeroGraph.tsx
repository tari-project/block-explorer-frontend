import React, { useCallback, useEffect, useState } from 'react';
import './HeroGraph.css';
import { fetchBlocksData } from '../../api';

interface Props {
    data: number[];
    width: number;
    height: number;
    yAxisTicks: number;
}

interface HeightBar {
    inputs: number;
    outputs: number;
    kernels: number;
    total: number;
}

const dimensions = {
    width: 1000,
    height: 300,
    margin: 10,
    elementSize: 6
} as const;

const dummyData = [
    {
        inputs: 100,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 300,
        outputs: 100,
        kernels: 200
    },
    {
        inputs: 200,
        outputs: 400,
        kernels: 200
    },
    {
        inputs: 200,
        outputs: 100,
        kernels: 200
    },
    {
        inputs: 100,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 100,
        outputs: 200,
        kernels: 300
    },
    {
        inputs: 100,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 200,
        outputs: 100,
        kernels: 200
    },
    {
        inputs: 300,
        outputs: 500,
        kernels: 200
    },
    {
        inputs: 200,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 100,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 400,
        outputs: 100,
        kernels: 100
    },
    {
        inputs: 200,
        outputs: 100,
        kernels: 200
    },
    {
        inputs: 100,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 100,
        outputs: 200,
        kernels: 300
    },
    {
        inputs: 100,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 200,
        outputs: 100,
        kernels: 200
    },
    {
        inputs: 300,
        outputs: 500,
        kernels: 200
    },
    {
        inputs: 200,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 100,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 400,
        outputs: 100,
        kernels: 100
    },
    {
        inputs: 200,
        outputs: 100,
        kernels: 200
    },
    {
        inputs: 100,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 100,
        outputs: 200,
        kernels: 300
    },
    {
        inputs: 100,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 200,
        outputs: 100,
        kernels: 200
    },
    {
        inputs: 300,
        outputs: 500,
        kernels: 200
    },
    {
        inputs: 200,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 100,
        outputs: 200,
        kernels: 100
    },
    {
        inputs: 400,
        outputs: 100,
        kernels: 100
    }
];

let blocksData: any[] = [];
export default function HeroGraph({ data, yAxisTicks }: Props) {
    const loadBlocksData = useCallback(async () => {
        const blockData = await fetchBlocksData();
        const { blocks } = blockData;

        blocks.forEach((block, index) => {
            const { body } = block.block;
            console.log(body);

            let valObj = {
                inputs: body.inputs.length,
                outputs: body.outputs.length,
                kernels: body.kernels.length
            };

            blocksData.push(valObj);
        });

        console.log(blocksData);
    }, []);

    function getData(): Array<HeightBar> {
        return blocksData.map((data) => {
            return {
                ...data,
                total: data.inputs + data.outputs + data.kernels
            };
        });
    }

    function getHighest(values: Array<HeightBar>): HeightBar {
        const maxHeights: HeightBar = { inputs: 0, kernels: 0, outputs: 0, total: 0 };
        getData().forEach((values: HeightBar) => {
            const keys = ['inputs', 'outputs', 'kernels', 'total'];
            keys.forEach((key) => {
                if (values[key] > maxHeights[key]) {
                    maxHeights[key] = values[key];
                }
            });
        });
        return maxHeights;
    }
    const { width, height } = dimensions;
    const [maxHeights, setMaxHeights] = useState({ inputs: 0, outputs: 0, kernels: 0, total: 0 });
    const [values, setValues] = useState([] as HeightBar[]);

    useEffect(
        () => {
            loadBlocksData().then((res) => {
                const values = getData();
                setValues(values);
                setMaxHeights(getHighest(values));
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setValues]
    );

    function round5({ num }: { num: any }) {
        return Math.ceil(num / 5) * 5;
    }

    function renderYAxis(maxHeights: HeightBar) {
        const nums: any[] = [];
        let ticks = yAxisTicks + 1;

        for (let i = 0; i < yAxisTicks + 1; i++) {
            ticks--;

            const displayNum = round5({ num: (maxHeights.total / yAxisTicks) * ticks });
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

    return (
        <svg className="simpleBars" height={height} width={width}>
            <g>{renderYAxis(maxHeights)}</g>

            <Chart values={values} maxHeights={maxHeights} />
        </svg>
    );
}

interface GraphicalElementProps {
    inputs: number;
    outputs: number;
    kernels: number;
    offset: number;
    maxHeights: HeightBar;
}
function Chart({ values, maxHeights }: { values: Array<HeightBar>; maxHeights: HeightBar }) {
    const { width, margin } = dimensions;
    const spaceBetweenBars = width / values.length;
    function relativeHeight(heights: HeightBar, maxHeights: HeightBar): HeightBar {
        const { inputs, outputs, kernels } = heights;
        const { total: maxTotal } = maxHeights;

        const inputPercent = inputs / maxTotal;
        const outputPercent = outputs / maxTotal;
        const kernelsPercent = kernels / maxTotal;
        return {
            inputs: inputPercent,
            outputs: outputPercent,
            kernels: kernelsPercent,
            total: 0
        };
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
                        maxHeights={maxHeights}
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
    offset
}: GraphicalElementProps) {
    const { height, elementSize } = dimensions;
    const kernelHeight = kernelsPercent * height;
    const outputHeight = outputsPercent * height;
    const inputsHeight = inputsPercent * height;
    const barPos1 = outputHeight + kernelHeight;
    const barPos2 = barPos1 + inputsHeight;

    return (
        <g>
            <g>
                <rect fill="#9330FF" width={elementSize} height={kernelHeight} x={offset} y={height - kernelHeight} />
            </g>
            <g>
                <rect fill="#B4C9F5" width={elementSize} height={outputHeight} x={offset} y={height - barPos1} />
            </g>
            <g>
                <rect fill="#FF7630" width={elementSize} height={inputsHeight} x={offset} y={height - barPos2} />
            </g>
        </g>
    );
}
