import React from "react";
import { City, Coords, Dimension, SVGContainer, WorldAtlas } from "../../typings";
import { Marks } from "./Marks";
import { max, scaleSqrt } from "d3";
import BubbleMap from "./BubbleMap";
// import styles from'./WorldAtlas.module.css';

interface Props extends SVGContainer {
  worldAtlas: WorldAtlas;
  cities: City[];
  sizeAttribute: keyof City;
  coords: Coords<City>;
  dimension: Dimension;
}

// const margin = { top: 20, right: 30, bottom: 65, left: 90 };
// const xAxisLabelOffset = 55;
// const yAxisLabelOffset = 45;

function Map({ width, height, worldAtlas, cities, sizeAttribute, coords, dimension }: Props) {
  // const innerHeight = height - margin.top - margin.bottom;
  // const innerWidth = width - margin.left - margin.right;

  const sizeValue = (d: any) => d[sizeAttribute];
  const maxRadius = 15;

  // const sizeScale = scaleSqrt()
  //   .domain([0, max(cities, sizeValue) as number])
  //   .range([0, maxRadius]);

    // console.log(sizeScale(max(cities, sizeValue) as number));
    // console.log(max(cities, sizeValue));
    // console.log(sizeValue(cities[0]));


  return (
    // <svg className={"svg"} width={width} height={height}>
    <svg className="svg" viewBox={`0 0 ${width} ${height}`}>
      <BubbleMap
        worldAtlas={worldAtlas}
        // cities={cities}
        data={cities}
        filteredData={cities}
        sizeAttribute={sizeAttribute}
        coords={coords}
        dimension={dimension}
      />
    </svg>
  );
}

export default Map;
