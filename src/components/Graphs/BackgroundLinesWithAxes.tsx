import React from 'react';

interface Props {
    data: number[];
    xAxisTicks?: any[];
    width: number;
    height: number;
    yAxisTicks: number;
    children: any;
}

export default function BackgroundLinesWithAxes({ width, height, data, yAxisTicks, children, xAxisTicks }: Props) {
    const highestNum = Math.max(...data);

    function round5({ num }: { num: any }) {
        return Math.ceil(num / 5) * 5;
    }

    function renderYAxis() {
        let nums = [];
        let ticks = yAxisTicks + 1;

        for (let i = 0; i < yAxisTicks + 1; i++) {
            ticks--;

            let displayNum = round5({ num: (highestNum / yAxisTicks) * ticks });
            nums.push(
                <g key={i}>
                    <text
                        style={{ fontFamily: 'Avenir, sans-serif', fontSize: 14 }}
                        key={`${i}-text`}
                        fill="#adadad"
                        x={-60}
                        y={(height / 6) * i}
                    >
                        {displayNum}k
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
        <div className="graph">
            <svg className="simpleBars" width={width} height={height}>
                <g>{renderYAxis()}</g>
                {children}
            </svg>
            <div style={{ width: width }} className="simpleGraphXTicks">
                {xAxisTicks &&
                    xAxisTicks.map((x, i) => {
                        return <div key={i}>{x}</div>;
                    })}
            </div>
        </div>
    );
}
