import React from "react";

import { scaleLinear } from "d3-scale";

interface Props {
  data: number[];
  width: number;
  height: number;
}

export default function SimpleBarGraph({ width, height, data }: Props) {
  const yScale = scaleLinear()
    .domain([0, Math.max(...data)])
    .rangeRound([height, 0]);
  const barWidth = Math.floor(width / data.length);

  return (
    <svg width={width} height={height}>
      {data.map((d, i) => (
        <rect
          key={i}
          x={i * barWidth}
          y={yScale(d)}
          width={barWidth - 1}
          height={height - yScale(d)}
        />
      ))}
    </svg>
  );
}
