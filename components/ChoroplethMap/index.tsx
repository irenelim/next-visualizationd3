import React from "react";
import { SVGContainer } from "../../typings";
import { max } from "d3-array";
import { scaleSequential, NumberValue } from "d3-scale";
import { interpolateYlOrRd } from "d3-scale-chromatic";
import { Marks } from "./Marks";
import styles from "./ChoroplethMap.module.css";

interface Props extends SVGContainer {
  worldAtlas: any;
  data: any;
  codes: any;
  //   rowByCountry: Map<any, any>;
  sizeAttribute: string;
}

// const margin = { top: 20, right: 30, bottom: 65, left: 90 };
// const xAxisLabelOffset = 55;
// const yAxisLabelOffset = 45;

function ChoroplethMap({
  width,
  height,
  worldAtlas,
  data,
  sizeAttribute,
  codes
}: Props) {
  // const innerHeight = height - margin.top - margin.bottom;
  // const innerWidth = width - margin.left - margin.right;

//   const numericCodeByAlphaCode = new Map();
//   codes.forEach((code: any) => {
//     const alpha3Code = code["alpha-3"];
//     const numericCode = code["country-code"];
//     numericCodeByAlphaCode.set(alpha3Code, numericCode);
//   });

  const rowByCountryCode = new Map();
  data.forEach((d: any) => {
    const alpha3Code = d.Code;
    // const numericCode = numericCodeByAlphaCode.get(alpha3Code);
    const numericCode = codes.find((c:any) => c["alpha-3"] === alpha3Code)?.["country-code"];
    console.log(numericCode, alpha3Code);
    if (numericCode) rowByCountryCode.set(numericCode, d);
  });
//   console.log(rowByCountryCode);

  const colorValue = (d: any) => d[sizeAttribute];

  const colorScale = scaleSequential(interpolateYlOrRd).domain([
    0,
    max(data, colorValue),
  ] as Iterable<NumberValue>);

  return (
    <svg className={"svg"} width={width} height={height}>
      <Marks
        styles={styles}
        worldAtlas={worldAtlas}
        rowByCountry={rowByCountryCode}
        colorScale={colorScale}
        colorValue={colorValue}
      />
    </svg>
  );
}

export default ChoroplethMap;
