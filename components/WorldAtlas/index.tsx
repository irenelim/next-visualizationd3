import React from "react";
import { SVGContainer } from "../../typings";
import { FeatureCollection, MultiLineString } from 'geojson';
import { Marks } from "./Marks";
import styles from'./WorldAtlas.module.css';
import { City } from "../../hooks/useCities";
import { max, scaleSqrt } from "d3";

interface Props extends SVGContainer {
  worldAtlas: any;
  cities: City[];
}

// const margin = { top: 20, right: 30, bottom: 65, left: 90 };
// const xAxisLabelOffset = 55;
// const yAxisLabelOffset = 45;

function Map({ width, height, worldAtlas, cities }: Props) {
  // const innerHeight = height - margin.top - margin.bottom;
  // const innerWidth = width - margin.left - margin.right;

  const sizeValue = (d: City) => d.population;
  const maxRadius = 15;

  const sizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue) as number])
    .range([0, maxRadius]);

    // console.log(sizeScale(max(cities, sizeValue) as number));
    // console.log(max(cities, sizeValue));
    // console.log(sizeValue(cities[0]));


  return (
    <svg className={"svg"} width={width} height={height}>
      <Marks
        styles={styles}
        worldAtlas={worldAtlas}
        cities={cities}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
}

export default Map;
