import React from "react";
import "./SimpleBarGraph.css";
import { scaleLinear } from "d3-scale";
import PlainGraphTitle from "../GraphTitles/PlainGraphTitle";
import Dropdown from "../Dropdown";
import GraphHeader from "../GraphHeader";

interface Props {
  data: number[];
  width: number;
  height: number;
  yAxisTicks: number;
}

export default function SimpleBarGraph({
  width,
  height,
  data,
  yAxisTicks,
}: Props) {
  const yScale = scaleLinear()
    .domain([0, Math.max(...data)])
    .rangeRound([height, 0]);
  const barWidth = Math.floor(width / data.length);

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
            style={{ fontFamily: "Avenir, sans-serif", fontSize: 14 }}
            key={i}
            fill="#adadad"
            x={-60}
            y={(height / 6) * i}
          >
            {displayNum}k
          </text>

          <line
            key={i}
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
    <div className="graphWrapper">
      <GraphHeader/>
      <div className="graph">
        <svg className="simpleBars" width={width} height={height}>
          <g>{renderYAxis()}</g>

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
        <div style={{ width: width }} className="simpleGraphXTicks">
          <div>Jan</div>
          <div>Feb</div>
          <div>March</div>
          <div>April</div>
          <div>May</div>
          <div>June</div>
        </div>
      </div>
    </div>
  );
}
