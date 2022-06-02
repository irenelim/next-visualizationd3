import React from "react";
import { DSVRowArray } from "d3-dsv";
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { format } from "d3-format";
import { SVGContainer } from "../../typings";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const margin = { top: 20, right: 30, bottom: 65, left: 220 };
const xAxisLabelOffset = 55;

interface Props extends SVGContainer {
  data: any[];
}

function BarChart({ width, height, data }: Props) {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = (d: any) => d.Country;
  const xValue = (d: any) => d.Population;

  const siFormat = format(".2s");
  const xAxisTickFormat = (tickValue: number) => siFormat(tickValue).replace('G', 'B');

  const yScale = scaleBand()
    .domain(data.map(yValue) as any)
    .range([0, innerHeight])
    .paddingInner(0.15);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue) as number])
    .range([0, innerWidth]);

  return (
    <svg className="svg" width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* tick lines */}
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        {/* chart title */}
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          Population
        </text>

        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
}

export default BarChart;
