import React from "react";
import { AidsData, CountryCode, SVGContainer, WorldAtlas } from "../../typings";
import { max } from "d3-array";
import { scaleSequential, NumberValue } from "d3-scale";
import { interpolateYlOrRd } from "d3-scale-chromatic";
import { Marks } from "./Marks";
import styles from "./ChoroplethMap.module.css";

interface Props<T> extends SVGContainer {
  worldAtlas: WorldAtlas;
  data: T[];
  codes: CountryCode[];
  //   rowByCountry: Map<any, any>;
  sizeAttribute: keyof T;
}

// const margin = { top: 20, right: 30, bottom: 65, left: 90 };
// const xAxisLabelOffset = 55;
// const yAxisLabelOffset = 45;

function ChoroplethMap<T extends AidsData>({
  width,
  height,
  worldAtlas,
  data,
  sizeAttribute,
  codes
}: Props<T>) {
  // const innerHeight = height - margin.top - margin.bottom;
  // const innerWidth = width - margin.left - margin.right;

//   const numericCodeByAlphaCode = new Map();
//   codes.forEach((code: any) => {
//     const alpha3Code = code["alpha-3"];
//     const numericCode = code["country-code"];
//     numericCodeByAlphaCode.set(alpha3Code, numericCode);
//   });

  const rowByCountryCode = new Map<string, T>();
  (data).forEach((d: T) => {
    const alpha3Code = d.Code;
    // const numericCode = numericCodeByAlphaCode.get(alpha3Code);
    const numericCode = codes.find((c: CountryCode) => c["alpha-3"] === alpha3Code)?.["country-code"];
    // console.log(numericCode, alpha3Code);
    if (numericCode) rowByCountryCode.set(numericCode, d);
  });

  const colorValue = (d: T) => d[sizeAttribute] as unknown as number;

  const colorScale = scaleSequential(interpolateYlOrRd)
    .domain([0, max(data, colorValue) as number]);

  return (
    <svg className={"svg"} width={width} height={height}>
      <Marks
        styles={styles}
        worldAtlas={worldAtlas}
        rowByCountry={rowByCountryCode}
        colorScale={colorScale}
        colorValue={colorValue}
        dimension={{ width, height }}
      />
    </svg>
  );
}

export default ChoroplethMap;
