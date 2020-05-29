import React, { useEffect, useState } from 'react';
import './PolygonGraph.css';

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
        outputs: 100,
        kernels: 100
    },
    {
        inputs: 200,
        outputs: 400,
        kernels: 200
    },
    {
        inputs: 50,
        outputs: 50,
        kernels: 50
    }
    // {
    //     inputs: 52,
    //     outputs: 23,
    //     kernels: 210
    // },
    // {
    //     inputs: 53,
    //     outputs: 32,
    //     kernels: 42
    // },
    // {
    //     inputs: 15,
    //     outputs: 13,
    //     kernels: 24
    // },
    // {
    //     inputs: 45,
    //     outputs: 31,
    //     kernels: 2
    // },
    // {
    //     inputs: 52,
    //     outputs: 23,
    //     kernels: 21
    // },
    // {
    //     inputs: 25,
    //     outputs: 33,
    //     kernels: 22
    // },
    // {
    //     inputs: 58,
    //     outputs: 38,
    //     kernels: 25
    // },
    // {
    //     inputs: 45,
    //     outputs: 35,
    //     kernels: 23
    // },
    // {
    //     inputs: 53,
    //     outputs: 34,
    //     kernels: 62
    // },
    // {
    //     inputs: 25,
    //     outputs: 33,
    //     kernels: 22
    // },
    // {
    //     inputs: 58,
    //     outputs: 38,
    //     kernels: 25
    // },
    // {
    //     inputs: 45,
    //     outputs: 35,
    //     kernels: 23
    // },
    // {
    //     inputs: 53,
    //     outputs: 34,
    //     kernels: 62
    // },
    // {
    //     inputs: 53,
    //     outputs: 32,
    //     kernels: 42
    // },
    // {
    //     inputs: 15,
    //     outputs: 13,
    //     kernels: 24
    // },
    // {
    //     inputs: 45,
    //     outputs: 31,
    //     kernels: 17
    // },
    // {
    //     inputs: 52,
    //     outputs: 23,
    //     kernels: 21
    // },
    // {
    //     inputs: 25,
    //     outputs: 33,
    //     kernels: 22
    // },
    // {
    //     inputs: 58,
    //     outputs: 38,
    //     kernels: 25
    // },
    //
    // {
    //     inputs: 45,
    //     outputs: 31,
    //     kernels: 30
    // },
    // {
    //     inputs: 52,
    //     outputs: 23,
    //     kernels: 21
    // },
    // {
    //     inputs: 25,
    //     outputs: 33,
    //     kernels: 22
    // },
    // {
    //     inputs: 58,
    //     outputs: 38,
    //     kernels: 25
    // },
    // {
    //     inputs: 45,
    //     outputs: 35,
    //     kernels: 23
    // },
    // {
    //     inputs: 53,
    //     outputs: 34,
    //     kernels: 62
    // },
    // {
    //     inputs: 25,
    //     outputs: 33,
    //     kernels: 22
    // },
    // {
    //     inputs: 58,
    //     outputs: 38,
    //     kernels: 25
    // },
    // {
    //     inputs: 45,
    //     outputs: 35,
    //     kernels: 23
    // },
    // {
    //     inputs: 53,
    //     outputs: 34,
    //     kernels: 62
    // },
    // {
    //     inputs: 45,
    //     outputs: 31,
    //     kernels: 2
    // },
    // {
    //     inputs: 52,
    //     outputs: 23,
    //     kernels: 21
    // },
    // {
    //     inputs: 25,
    //     outputs: 33,
    //     kernels: 22
    // },
    // {
    //     inputs: 58,
    //     outputs: 38,
    //     kernels: 25
    // },
    // {
    //     inputs: 45,
    //     outputs: 35,
    //     kernels: 23
    // },
    // {
    //     inputs: 53,
    //     outputs: 34,
    //     kernels: 62
    // },
    // {
    //     inputs: 25,
    //     outputs: 33,
    //     kernels: 22
    // },
    // {
    //     inputs: 58,
    //     outputs: 38,
    //     kernels: 25
    // },
    // {
    //     inputs: 45,
    //     outputs: 35,
    //     kernels: 23
    // },
    // {
    //     inputs: 53,
    //     outputs: 34,
    //     kernels: 62
    // },
    // {
    //     inputs: 53,
    //     outputs: 32,
    //     kernels: 42
    // },
    // {
    //     inputs: 15,
    //     outputs: 13,
    //     kernels: 24
    // },
    // {
    //     inputs: 45,
    //     outputs: 31,
    //     kernels: 14
    // },
    // {
    //     inputs: 52,
    //     outputs: 23,
    //     kernels: 21
    // },
    // {
    //     inputs: 25,
    //     outputs: 33,
    //     kernels: 22
    // },
    // {
    //     inputs: 58,
    //     outputs: 38,
    //     kernels: 25
    // },
    // {
    //     inputs: 45,
    //     outputs: 35,
    //     kernels: 23
    // },
    // {
    //     inputs: 53,
    //     outputs: 32,
    //     kernels: 42
    // },
    // {
    //     inputs: 15,
    //     outputs: 13,
    //     kernels: 24
    // },
    // {
    //     inputs: 45,
    //     outputs: 31,
    //     kernels: 70
    // },
    // {
    //     inputs: 52,
    //     outputs: 23,
    //     kernels: 21
    // },
    // {
    //     inputs: 25,
    //     outputs: 33,
    //     kernels: 22
    // },
    // {
    //     inputs: 58,
    //     outputs: 38,
    //     kernels: 25
    // },
    // {
    //     inputs: 45,
    //     outputs: 35,
    //     kernels: 23
    // },
    // {
    //     inputs: 40,
    //     outputs: 35,
    //     kernels: 23
    // },
    // {
    //     inputs: 53,
    //     outputs: 34,
    //     kernels: 62
    // }
];
const heightTotals: number[] = [];

export default function HeroGraph({ data, yAxisTicks }: Props) {
    function getData(): Array<HeightBar> {
        return dummyData.map((data) => {
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

    useEffect(() => {
        const values = getData();
        setValues(values);
        setMaxHeights(getHighest(values));
    }, []);

    function round5({ num }: { num: any }) {
        return Math.ceil(num / 5) * 5;
    }

    function renderYAxis(maxHeights: HeightBar) {
        const nums: any[] = [];
        let ticks = yAxisTicks + 1;

        for (let i = 0; i < yAxisTicks + 1; i++) {
            ticks--;

            const displayNum = round5({ num: (maxHeights.total / yAxisTicks) * ticks });
            console.log(maxHeights.total);
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
    const { width, height, margin } = dimensions;
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
    offset,
    maxHeights
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
