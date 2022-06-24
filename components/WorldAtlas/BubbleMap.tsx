import React, { useMemo } from "react";
import { max, scaleSqrt } from "d3";
import { City, Coords, Data, Dimension, WorldAtlas } from "../../typings";
import { Marks } from "./Marks";
import styles from "./WorldAtlas.module.css";

interface Props<T> {
  worldAtlas: WorldAtlas;
  data: T[];
  filteredData: T[];
  sizeAttribute: keyof T;
  coords: Coords;
  dimension: Dimension;
}

// const margin = { top: 20, right: 30, bottom: 65, left: 90 };
// const xAxisLabelOffset = 55;
// const yAxisLabelOffset = 45;

const maxRadius = 15;

function BubbleMap({
  worldAtlas,
  data,
  filteredData,
  sizeAttribute,
  coords,
  dimension
}: Props<City>) {

  // const sizeValue = (d: any) => d[sizeAttribute];
  // const sizeScale = scaleSqrt()
  // .domain([0, max(data, sizeValue) as number])
  // .range([0, maxRadius]);

  const sizeValue = useMemo(
    () => (d: City) => d[sizeAttribute] as number,
    [sizeAttribute]
  );
  const sizeScale = useMemo(() => {
    return scaleSqrt()
      .domain([0, max(data, sizeValue) as number])
      .range([0, maxRadius]);
  }, [data, sizeValue, maxRadius]);

  return (
    <Marks
      styles={styles}
      worldAtlas={worldAtlas}
      data={filteredData}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
      coords={coords}
      dimension={dimension}
    />
  );
}

export default BubbleMap;
