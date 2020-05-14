import React, { useEffect, useRef } from "react";
import "./SimpleBarGraph.css";
import { scaleLinear } from "d3-scale";
import * as d3 from "d3";

interface Props {
  data: number[];
  width: number;
  title: string;
  subTitle: string;
  height: number;
}

export default function SimpleBarGraph({
  width,
  height,
  data,
  title,
  subTitle,
}: Props) {
  const yScale = scaleLinear()
    .domain([0, Math.max(...data)])
    .rangeRound([height, 0]);
  const barWidth = Math.floor(width / data.length);

  const highestNum = Math.max(...data);

  return (
    <div className="graphWrapper">
      <div className="graphTitle">{title}</div>{" "}
      <div className="graphSubtitle">{subTitle}</div>
      <div className="graph">
        <svg className="simpleBars" width={width} height={height}>
          {data.map((d, i) => {
            return (
              <line
                width={width}
                stroke="#adadad"
                strokeDasharray="3.3"
                strokeWidth={1}
                x1={0}
                x2={width}
                y1={(height / 6) * i}
                y2={(height / 6) * i}
              />
            );
          })}

          {data.map((d, i) => {
            return (
              <rect
                rx="3"
                className="bar"
                key={i}
                x={i * barWidth}
                y={yScale(d)}
                width={barWidth / 2}
                height={height - yScale(d)}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
