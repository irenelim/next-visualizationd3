import React, { useMemo } from "react";
import { Marks } from "./Marks";
import styles from "./WorldAtlas.module.css";
import { City } from "../../hooks/useCities";
import { max, scaleSqrt } from "d3";

interface Props {
  worldAtlas: any;
  data: City[] | unknown[];
  filteredData: City[] | unknown[];
  sizeAttribute: string;
  coords: any;
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
}: Props) {

  // const sizeValue = (d: any) => d[sizeAttribute];
  // const sizeScale = scaleSqrt()
  // .domain([0, max(data, sizeValue) as number])
  // .range([0, maxRadius]);

  const sizeValue = useMemo(
    () => (d: any) => d[sizeAttribute],
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
    />
  );
}

export default BubbleMap;
