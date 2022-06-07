import React, { useEffect, useMemo, useRef } from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { extent, bin, sum, max } from "d3-array";
import { timeMonths } from "d3-time";
import { timeFormat } from "d3-time-format";
import { brushX } from "d3-brush";
import { Marks } from "./Marks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import styles from "./DateHistogram.module.css";
import { select } from "d3-selection";

const margin = { top: 0, right: 30, bottom: 20, left: 60 };
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 30;

interface Props {
  data: any[];
  xAttribute: string;
  yAttribute: string;
  xAxisLabel: string;
  yAxisLabel: string;
  xTimeFormat: string;
  height: number;
  width: number;
  setBrushExtent: (
    extents: [Date | string | number, Date | string | number] | null
  ) => void;
  xValue: (d: any) => Date;
}

function DateHistogram({
  data,
  xAttribute,
  yAttribute,
  xAxisLabel,
  yAxisLabel,
  xTimeFormat,
  height,
  width,
  setBrushExtent,
  xValue,
}: Props) {
  const brushRef = useRef<SVGGElement | null>(null);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  //   const xValue = (d: any) => new Date(d[xAttribute]);
  //   const yValue = (d: any) => d[yAttribute];

  const xAxisTickFormat = timeFormat(xTimeFormat);

  const xScale = useMemo(() => {
    // console.log('compute xScale');
    return scaleTime()
      .domain(extent(data, xValue) as [Date, Date])
      .range([0, innerWidth])
      .nice();
  }, [data, xValue, innerWidth]);

  const binnedData = useMemo(() => {
    const xValueNum = (d: any) => new Date(d[xAttribute]).getTime();
    const yValue = (d: any) => d[yAttribute];
    const [start, stop] = xScale.domain();
    // console.log('compute binnedData');
    return bin()
      .value(xValueNum)
      .domain([start.getTime(), stop.getTime()])
      .thresholds(timeMonths(start, stop).map((t) => t.getTime()))(data)
      .map((arr) => ({
        y: sum(arr, yValue),
        x0: arr.x0,
        x1: arr.x1,
      }));
  }, [xAttribute, yAttribute, xScale, data]);

  const yScale = useMemo(() => {
    const aggYValue = (d: any) => d.y;
    return scaleLinear()
      .domain([max(binnedData, aggYValue), 0])
      .range([0, innerHeight])
      .nice();
  }, [binnedData, innerHeight]);

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);

    brush(select(brushRef.current!));
    brush.on("brush end", (event) => {
      setBrushExtent(event?.selection?.map(xScale.invert));
    });
  }, [innerWidth, innerHeight]);

  return (
    <>
      <rect width={width} height={height} fill="white" />
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* tick lines */}
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={7}
          styles={styles}
        />
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffset={7}
          styles={styles}
        />
        {/* chart title */}
        <text
          className={styles["axis-label"]}
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <text
          className={styles["axis-label"]}
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>

        <Marks
          data={binnedData}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={xAxisTickFormat}
          innerHeight={innerHeight}
        />
        <g ref={brushRef} />
      </g>
    </>
  );
}

export default DateHistogram;
