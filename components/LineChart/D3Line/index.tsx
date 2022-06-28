import React from "react";
import { line } from "d3-shape";
import { scaleTime, scaleLinear } from "d3-scale";
import { extent, min, max } from "d3-array";
import { timeFormat } from "d3-time-format";
import { Range, SVGContainer } from "../../../typings";
import styles from "./D3Line.module.css";
import YMarkerLine from "./YMarkerLine";
import XMarkerLine from "./XMarkerLine";
import XAxis from "./XAxis";

const margin = { top: 20, right: 50, bottom: 65, left: 100 };
// const xAxisLabelOffset = 55;
// const yAxisLabelOffset = 45;

interface Props<T> extends SVGContainer {
  data: T[];
  xAttribute: keyof T;
  yAttribute: keyof T;
  xAxisLabel: string;
  yAxisLabel: string;
  xTimeFormat: string;
}

function LineChart<T>({
  width,
  height,
  data,
  xAttribute,
  yAttribute,
  xAxisLabel,
  yAxisLabel,
  xTimeFormat,
}: Props<T>) {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d: T) => d[xAttribute] as unknown as Date;
  const yValue = (d: T) => d[yAttribute] as unknown as number;

  const xAxisTickFormat = timeFormat(xTimeFormat);

  const xScale = scaleTime()
    // .domain([min(data, xValue), max(data, xValue)] as [Date, Date])
    .domain(extent(data, xValue) as Range<Date>)
    .range([0, innerWidth]);
    // .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue) as Range<number>)
    .range([innerHeight, 0]);
    // .nice();

  const lineGenerator = line<T>()
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

        <YMarkerLine
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
        />
        <XAxis xScale={xScale} innerWidth={innerWidth} innerHeight={innerHeight} />
        <path className={styles.path} d={lineGenerator(data) as string} />
      </g>
    </svg>
  );
}

export default LineChart;
