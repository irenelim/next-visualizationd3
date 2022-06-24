import React from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { extent, min, max } from "d3-array";
import { timeFormat } from "d3-time-format";
import { Data, DataArray, Range, SVGContainer } from "../../typings";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 55;
const yAxisLabelOffset = 45;

interface Props extends SVGContainer {
  data: DataArray;
  xAttribute: string;
  yAttribute: string;
  xAxisLabel: string;
  yAxisLabel: string;
  xTimeFormat: string;
}

function LineChart({
  width,
  height,
  data,
  xAttribute,
  yAttribute,
  xAxisLabel,
  yAxisLabel,
  xTimeFormat
}: Props) {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d: Data) => new Date(d[xAttribute]);
  // const xAxisLabel = "Time";

  const yValue = (d: Data) => d[yAttribute] as number;
  // const yAxisLabel = "Temperature";

  const xAxisTickFormat = timeFormat(xTimeFormat);

  const xScale = scaleTime()
  // .domain([min(data, xValue), max(data, xValue)] as [Date, Date])
    .domain(extent(data, xValue) as Range<Date>)
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue) as Range<number>)
    .range([innerHeight, 0])
    .nice();

  return (
    // <svg className="svg" width={width} height={height}>
    <svg className="svg" viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* tick lines */}
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={7}
        />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
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
          // x={-yAxisLabelOffset}
          // y={innerHeight / 2}
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
          circleRadius={4}
        />
      </g>
    </svg>
  );
}

export default LineChart;
