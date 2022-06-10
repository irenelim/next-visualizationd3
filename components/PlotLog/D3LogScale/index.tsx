import React from "react";
import { line } from "d3-shape";
import { scaleTime, scaleLog } from "d3-scale";
import { extent, max } from "d3-array";
import { timeFormat } from "d3-time-format";
import { SVGContainer } from "../../../typings";
import styles from "./D3LogScale.module.css";
import YMarkerLine from "./YMarkerLine";
import XMarkerLine from "./XMarkerLine";
import XAxis from "./XAxis";
import YAxis from "./YAxis";

const margin = { top: 40, right: 50, bottom: 65, left: 100 };
const xAxisLabelOffset = 55;
const yAxisLabelOffset = 45;

interface Props extends SVGContainer {
  data: any[];
  xAttribute: string;
  yAttribute: string;
  xAxisLabel: string;
  yAxisLabel: string;
  xTimeFormat: string;
}

function LogScale({
  width,
  height,
  data,
  xAttribute,
  yAttribute,
  xAxisLabel,
  yAxisLabel,
  xTimeFormat,
}: Props) {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d: any) => d[xAttribute];
  const yValue = (d: any) => d[yAttribute];

  const xAxisTickFormat = timeFormat(xTimeFormat);

  const xScale = scaleTime()
    // .domain([min(data, xValue), max(data, xValue)] as [Date, Date])
    .domain(extent(data, xValue) as [Date, Date])
    .range([0, innerWidth]);
  // .nice();

  const yScale = scaleLog()
    .domain([1, max(data, yValue)])
    .range([innerHeight, 0]);
  // .nice();

  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)));

  const mostRecentDate = xScale.domain()[1];
  // const mostRecentDate = data[data.length - 1].date;
  // console.log(xScale.domain(), data[0].date, data[data.length - 1].date);

  return (
    <svg className="svg" width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={7}
        />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
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
        </text> */}

        {/* <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={4}
        /> */}

        <XAxis
          xScale={xScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
        />
        <YAxis
          yScale={yScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
        />

        {/* <YMarkerLine
          value={6200000}
          yScale={yScale}
          styles={styles}
          innerWidth={innerWidth}
        />
        <YMarkerLine
          value={6300000}
          yScale={yScale}
          styles={styles}
          innerWidth={innerWidth}
        />
        <XMarkerLine
          value={mostRecentDate}
          xScale={xScale}
          styles={styles}
          innerHeight={innerHeight}
          xAxisTickFormat={xAxisTickFormat}
        /> */}

        <path className={styles.path} d={lineGenerator(data) as string} />
        <text className={styles.title} textAnchor="middle" transform={`translate(${innerWidth / 2},0)`}>
          Global Coronavirus Deaths Over Time
        </text>
        <text
          className={styles.axisLabel}
          textAnchor="middle"
          alignmentBaseline="hanging"
          transform={`translate(${innerWidth / 2},${innerHeight + 25})`}
        >
          Time
        </text>
        <text
          className={styles.axisLabel}
          transform={`translate(-50, ${innerHeight / 2}) rotate(-90)`}
          textAnchor="middle"
        >
          Cumulative Deaths
        </text>
      </g>
    </svg>
  );
}

export default LogScale;
