import React from "react";
import { SVGContainer } from "../../typings";
import { FeatureCollection, MultiLineString } from 'geojson';
import { Marks } from "./Marks";
import styles from'./WorldAtlas.module.css';

interface Props extends SVGContainer {
    data: any
}

// const margin = { top: 20, right: 30, bottom: 65, left: 90 };
// const xAxisLabelOffset = 55;
// const yAxisLabelOffset = 45;

function Map({ width, height, data }: Props) {
  // const innerHeight = height - margin.top - margin.bottom;
  // const innerWidth = width - margin.left - margin.right;


  return (
    <svg className={"svg"} width={width} height={height}>
      <Marks
        styles={styles}
        data={data}
      />
    </svg>
  );
}

export default Map;
