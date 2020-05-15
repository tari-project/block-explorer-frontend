import React from "react";

const dimensions = {
  width: 430,
  height: 120,
  margin: 10,
  elementSize: 3,
} as const;

const halfSize = dimensions.elementSize / 2;

interface DataPoint {
  bar: number;
  circle: number;
}

function* generateDataPoint(): Generator<DataPoint, DataPoint> {
  const { height, elementSize } = dimensions;
  const maxCircleHeight = height - elementSize;
  while (true) {
    // never clip the bottom part of the circle
    const circle = Math.max(
      elementSize,
      Math.floor(Math.random() * maxCircleHeight)
    );

    // from 10 to 100, rounded to nearest ten
    const bar = Math.ceil(Math.random() * 10) * 10;

    yield { bar, circle };
  }
}

export default function BlockChart() {
  const { width, height, margin } = dimensions;
  const numberOfBars = 32;
  const spaceBetweenBars = width / 32;
  const range = [...Array(numberOfBars).keys()];

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin}, 0)`}>
        {range.map((i) => {
          const { bar, circle } = generateDataPoint().next().value;
          const offset = i * spaceBetweenBars - halfSize;

          return (
            <g key={i}>
              <Bar offset={offset} value={bar} />
              <Circle offset={offset} value={circle} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

interface GraphicalElementProps {
  offset: number;
  value: number;
}

function Bar({ offset, value }: GraphicalElementProps) {
  const { height, elementSize } = dimensions;
  return (
    <rect
      fill="#9d7396"
      width={elementSize}
      height={value}
      rx={halfSize}
      x={offset - halfSize}
      y={height - value}
    />
  );
}

function Circle({ offset, value }: GraphicalElementProps) {
  const { height, elementSize } = dimensions;
  return (
    <circle
      fill="#f7944f"
      stroke="#ffffff"
      r={elementSize}
      cx={offset}
      cy={height - value}
    />
  );
}
