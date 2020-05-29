import React, { useEffect } from 'react';
import './PolygonGraph.css';
import BackgroundLinesWithAxes from './BackgroundLinesWithAxes';

interface Props {
    data: number[];
    width: number;
    height: number;
    yAxisTicks: number;
}

const dimensions = {
    width: 1000,
    height: 300,
    margin: 10,
    elementSize: 6
} as const;

const dummyData = [
    {
        inputs: 83,
        outputs: 32,
        kernels: 42
    },
    {
        inputs: 150,
        outputs: 13,
        kernels: 24
    },
    {
        inputs: 45,
        outputs: 31,
        kernels: 12
    },
    {
        inputs: 52,
        outputs: 23,
        kernels: 210
    },
    {
        inputs: 53,
        outputs: 32,
        kernels: 42
    },
    {
        inputs: 15,
        outputs: 13,
        kernels: 24
    },
    {
        inputs: 45,
        outputs: 31,
        kernels: 2
    },
    {
        inputs: 52,
        outputs: 23,
        kernels: 21
    },
    {
        inputs: 25,
        outputs: 33,
        kernels: 22
    },
    {
        inputs: 58,
        outputs: 38,
        kernels: 25
    },
    {
        inputs: 45,
        outputs: 35,
        kernels: 23
    },
    {
        inputs: 53,
        outputs: 34,
        kernels: 62
    },
    {
        inputs: 25,
        outputs: 33,
        kernels: 22
    },
    {
        inputs: 58,
        outputs: 38,
        kernels: 25
    },
    {
        inputs: 45,
        outputs: 35,
        kernels: 23
    },
    {
        inputs: 53,
        outputs: 34,
        kernels: 62
    },
    {
        inputs: 53,
        outputs: 32,
        kernels: 42
    },
    {
        inputs: 15,
        outputs: 13,
        kernels: 24
    },
    {
        inputs: 45,
        outputs: 31,
        kernels: 17
    },
    {
        inputs: 52,
        outputs: 23,
        kernels: 21
    },
    {
        inputs: 25,
        outputs: 33,
        kernels: 22
    },
    {
        inputs: 58,
        outputs: 38,
        kernels: 25
    },

    {
        inputs: 45,
        outputs: 31,
        kernels: 30
    },
    {
        inputs: 52,
        outputs: 23,
        kernels: 21
    },
    {
        inputs: 25,
        outputs: 33,
        kernels: 22
    },
    {
        inputs: 58,
        outputs: 38,
        kernels: 25
    },
    {
        inputs: 45,
        outputs: 35,
        kernels: 23
    },
    {
        inputs: 53,
        outputs: 34,
        kernels: 62
    },
    {
        inputs: 25,
        outputs: 33,
        kernels: 22
    },
    {
        inputs: 58,
        outputs: 38,
        kernels: 25
    },
    {
        inputs: 45,
        outputs: 35,
        kernels: 23
    },
    {
        inputs: 53,
        outputs: 34,
        kernels: 62
    },
    {
        inputs: 45,
        outputs: 31,
        kernels: 2
    },
    {
        inputs: 52,
        outputs: 23,
        kernels: 21
    },
    {
        inputs: 25,
        outputs: 33,
        kernels: 22
    },
    {
        inputs: 58,
        outputs: 38,
        kernels: 25
    },
    {
        inputs: 45,
        outputs: 35,
        kernels: 23
    },
    {
        inputs: 53,
        outputs: 34,
        kernels: 62
    },
    {
        inputs: 25,
        outputs: 33,
        kernels: 22
    },
    {
        inputs: 58,
        outputs: 38,
        kernels: 25
    },
    {
        inputs: 45,
        outputs: 35,
        kernels: 23
    },
    {
        inputs: 53,
        outputs: 34,
        kernels: 62
    },
    {
        inputs: 53,
        outputs: 32,
        kernels: 42
    },
    {
        inputs: 15,
        outputs: 13,
        kernels: 24
    },
    {
        inputs: 45,
        outputs: 31,
        kernels: 14
    },
    {
        inputs: 52,
        outputs: 23,
        kernels: 21
    },
    {
        inputs: 25,
        outputs: 33,
        kernels: 22
    },
    {
        inputs: 58,
        outputs: 38,
        kernels: 25
    },
    {
        inputs: 45,
        outputs: 35,
        kernels: 23
    },
    {
        inputs: 53,
        outputs: 32,
        kernels: 42
    },
    {
        inputs: 15,
        outputs: 13,
        kernels: 24
    },
    {
        inputs: 45,
        outputs: 31,
        kernels: 70
    },
    {
        inputs: 52,
        outputs: 23,
        kernels: 21
    },
    {
        inputs: 25,
        outputs: 33,
        kernels: 22
    },
    {
        inputs: 58,
        outputs: 38,
        kernels: 25
    },
    {
        inputs: 45,
        outputs: 35,
        kernels: 23
    },
    {
        inputs: 40,
        outputs: 35,
        kernels: 23
    },
    {
        inputs: 53,
        outputs: 34,
        kernels: 62
    }
];
const heightTotals: number[] = [];

export default function HeroGraph({ data, yAxisTicks }: Props) {
    const { width, height } = dimensions;

    useEffect(() => {
        getHighest();
    }, []);

    function getHighest() {
        dummyData.forEach((values) => {
            const heightTotal = values.inputs + values.outputs + values.kernels;
            heightTotals.push(heightTotal);
        });
        return Math.max(...heightTotals);
    }
    let highestNum: number = getHighest();

    function round5({ num }: { num: any }) {
        return Math.ceil(num / 5) * 5;
    }

    function renderYAxis() {
        let nums = [];
        let ticks = yAxisTicks + 1;

        for (let i = 0; i < yAxisTicks + 1; i++) {
            ticks--;

            let displayNum = round5({ num: (highestNum / yAxisTicks) * ticks });
            console.log(highestNum);
            nums.push(
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
            );
        }
        return nums;
    }

    return (
        <svg className="simpleBars" height={height} width={width}>
            <g>{renderYAxis()}</g>

            <Chart />
        </svg>
    );
}

function Chart() {
    const { width, height, margin } = dimensions;
    const spaceBetweenBars = width / dummyData.length;
    return (
        <g transform={`translate(${margin}, 0)`}>
            {dummyData.map((d, i) => {
                const offset = i * spaceBetweenBars;

                return <Bar key={i} offset={offset} inputs={d.inputs} outputs={d.outputs} kernels={d.kernels} />;
            })}
        </g>
    );
}

interface GraphicalElementProps {
    inputs: number;
    outputs: number;
    kernels: number;
    offset: number;
}

function Bar({ kernels, outputs, inputs, offset }: GraphicalElementProps) {
    const { height, elementSize } = dimensions;
    const barPos1 = outputs + kernels;
    const barPos2 = barPos1 + inputs;

    return (
        <g>
            <g>
                <rect fill="#9330FF" width={elementSize} height={kernels} x={offset} y={height - kernels} />
            </g>
            <g>
                <rect fill="#B4C9F5" width={elementSize} height={outputs} x={offset} y={height - barPos1} />
            </g>
            <g>
                <rect fill="#FF7630" width={elementSize} height={inputs} x={offset} y={height - barPos2} />
            </g>
        </g>
    );
}
