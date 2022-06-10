import React, { useCallback, useMemo, useState } from "react";
import { line } from "d3-shape";
import { scaleTime, scaleLog } from "d3-scale";
import { extent, max } from "d3-array";
import { SVGContainer } from "../../typings";
import styles from "./Multiline.module.css";

import XAxis from "./XAxis";
import YAxis from "./YAxis";
import VoronoiOverlay from "./VoronoiOverlay";
import Tooltip from "./Tooltip";

const margin = { top: 40, right: 50, bottom: 65, left: 100 };

const epsilon = 1;

interface Props extends SVGContainer {
  data: any[];
  xAttribute: string;
  yAttribute: string;
}

function Multiline({
  width,
  height,
  data,
  xAttribute,
  yAttribute
}: Props) {
  const [activeRow, setActiveRow] = useState<any>(null);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d: any) => d[xAttribute];
  const yValue = (d: any) => d[yAttribute];

  const allData = useMemo(
    () => data.reduce((acc, val) => acc.concat(val), []),
    []
  );

  const xScale = scaleTime()
    .domain(extent(allData, xValue) as any)
    .range([0, innerWidth]);
  // .nice();

  const yScale = scaleLog()
    .domain([epsilon, max(allData, yValue) as any])
    .range([innerHeight, 0]);
  // .nice();

  const lineGenerator: any = useMemo(
    () =>
      line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(epsilon + yValue(d))),
    []
  );

  // const handleVoronoiHover = useCallback((d: any) => {
  //   setActiveRow(d);
  // }, []);
  const handleVoronoiHover = useCallback(setActiveRow, []);

  return (
    <svg className="svg" width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
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

        {data.map((countryData, i) => {
          return (
            <path
              key={i}
              className={styles.path}
              d={lineGenerator(countryData) as string}
            />
          );
        })}
        {activeRow ? (
          <>
            <path
              className={`${styles.path} ${styles.active}`}
              d={
                lineGenerator(
                  data.find((c) => c.countryName === activeRow.countryName)
                ) as string
              }
            />
            <g
              transform={`translate(${lineGenerator.x()(
                activeRow
              )},${lineGenerator.y()(activeRow)})`}
            >
              <circle r={2} />
              <Tooltip className={styles.tooltipStroke} activeRow={activeRow} />
              <Tooltip className={styles.tooltip} activeRow={activeRow} />
            </g>
          </>
        ) : null}

        <text
          className={styles.title}
          textAnchor="middle"
          transform={`translate(${innerWidth / 2},0)`}
        >
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
        <VoronoiOverlay
          onHover={handleVoronoiHover}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          allData={allData}
          lineGenerator={lineGenerator}
          margin={margin}
        />
      </g>
    </svg>
  );
}

export default Multiline;
