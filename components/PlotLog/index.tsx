import React from "react";
import { scaleLog, scaleTime } from "d3-scale";
import { extent, max } from "d3-array";
import { SVGContainer } from "../../typings";
import { AxisBottom } from "../LineChart/AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { timeFormat } from "d3-time-format";

const margin = { top: 20, right: 200, bottom: 68, left: 90 };
const xAxisLabelOffset = 55;
const yAxisLabelOffset = 45;
const circleRadius = 2;

interface Props extends SVGContainer {
  data: any[];
  xAttribute?: string;
  yAttribute?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

function PlotLog({
  width,
  height,
  data,
  xAttribute = "petal_length",
  yAttribute = "sepal_width",
  xAxisLabel = "Petal Length",
  yAxisLabel = "Sepal Width",
}: Props) {
 
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d: any) => new Date(d[xAttribute]);

  const yValue = (d: any) => d[yAttribute];

  const xAxisTickFormat = timeFormat('%m/%d/%Y');

  const xScale = scaleTime()
    .domain(extent(data, xValue) as [Date, Date])
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLog()
    .domain([1, max(data, yValue)])
    .range([innerHeight, 0]);


  return (
    <svg className="svg" width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* tick lines */}
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        {/* chart title */}
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={circleRadius}
        />
      </g>
    </svg>
  );
}

export default PlotLog;
