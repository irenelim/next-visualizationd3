import React from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { format } from "d3-format";
import { SVGContainer } from "../../typings";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const margin = { top: 20, right: 30, bottom: 68, left: 90 };
const xAxisLabelOffset = 55;
const yAxisLabelOffset = 45;

interface Props extends SVGContainer {
  data: any[];
  xAttribute?: string;
  yAttribute?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

function PlotChart({
  width,
  height,
  data,
  xAttribute = "petal_length",
  yAttribute = "sepal_width",
  xAxisLabel = "Petal Length",
  yAxisLabel = "Sepal Width"
}: Props) {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // const xAttribute = 'petal_length';
  const xValue = (d: any) => d[xAttribute];
  // const xAxisLabel = "Petal Length";

  const yValue = (d: any) => d[yAttribute];
  // const yAxisLabel = "Sepal Width";

  const siFormat = format(".2s");
  const xAxisTickFormat = (tickValue: number) =>
    siFormat(tickValue).replace("G", "B");

  const xScale = scaleLinear()
    .domain(extent(data, xValue) as [number, number])
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue) as [number, number])
    .range([0, innerHeight]);

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
          circleRadius={7}
        />
      </g>
    </svg>
  );
}

export default PlotChart;
