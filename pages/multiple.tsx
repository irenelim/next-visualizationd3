import Head from "next/head";
import { csv } from "d3-fetch";
import { DSVRowArray } from "d3-dsv";
import { Topology } from "topojson-specification";
import { feature, mesh } from "topojson-client";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Feature, MultiLineString, Point, GeoJsonProperties } from "geojson";
import Map from "../components/WorldAtlas";
import AggChart from "../components/AggregationChart";
import BubbleMap from "../components/WorldAtlas/BubbleMap";
import DateHistogram from "../components/AggregationChart/DateHistogram";
import useWindowSize from "../hooks/useWindowSize";
import Home from "../components/Home";
import useData from "../hooks/useData2";
interface WorldAtlas {
  // data: Topology;
  land: Feature<Point, GeoJsonProperties>;
  // land: FeatureCollection;
  interiors: MultiLineString;
}
interface Props {
  data: DSVRowArray;
}

const csvUrl =
"https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";
const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
// const width = 960;
// const height = 500;

const dateHistogramSize = 0.2; // 20%

const xValue = (d: any) => new Date(d['Reported Date']);

// function multiple({ data }: Props) {
function multiple() {
  const { width, height } = useWindowSize();
  const data: (DSVRowArray | null) = useData(csvUrl) as DSVRowArray;
  const { data: world } = useFetch<Topology>(jsonUrl);
  // const cities: City[] | null = useCities();
  const [worldAtlas, setWorldAtlas] = useState<WorldAtlas | null>(null);
  const [brushExtent, setBrushExtent] = useState<[Date | string | number, Date | string | number] | null>(null);
  
  useEffect(() => {
    if (world && world.objects) {
      const { countries, land }: any = world.objects;
      const geojsonData: WorldAtlas = {
        // countries: feature(data, countries),
        land: feature(world, land),
        interiors: mesh(world, countries, (a, b) => a !== b),
      };
      setWorldAtlas(geojsonData);
    }
  }, [world]);

  if (!world || !data) {
    return <pre>Loading...</pre>;
  }

  const filteredData = brushExtent ? data.filter((d) => {
    const date = xValue(d);
      return date > brushExtent[0] && date < brushExtent[1];
  }) : data;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Multiple Chart with Brushing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">Missing Migrant</h1>

        {worldAtlas && (
          <svg className={"svg"} width={width} height={height}>
            <BubbleMap
              worldAtlas={worldAtlas}
              // cities={data}
              data={data}
              filteredData={filteredData}
              sizeAttribute="Total Dead and Missing"
              coords={(d: any) => d.coords}
              dimension={{ width, height }}
            />
            <g transform={`translate(0,${height - dateHistogramSize * height})`}>
              <DateHistogram
                data={data}
                xAttribute="Reported Date"
                yAttribute="Total Dead and Missing"
                xAxisLabel="Reported Date"
                yAxisLabel="Total Dead and Missing"
                xTimeFormat="%d/%m/%Y"
                height={dateHistogramSize * height}
                width={width}
                setBrushExtent={setBrushExtent}
                xValue={xValue}
              />
            </g>
          </svg>
        )}

        {/* <AggChart
          width={800}
          height={500}
          data={data}
          xAttribute="Reported Date"
          yAttribute="Total Dead and Missing"
          xAxisLabel="Reported Date"
          yAxisLabel="Total Dead and Missing"
          xTimeFormat="%d/%m/%Y"
        /> */}
      </main>
    </div>
  );
}

// export async function getStaticProps() {
//   const csvUrl =
//     "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";
//   const row = (d: any) => {
//     d["Total Dead and Missing"] = +d["Total Dead and Missing"];
//     // d["Reported Date"] = new Date(d["Reported Date"]);
//     d.coords = d["Location Coordinates"]
//       .split(",")
//       .map((d: string) => +d)
//       .reverse();
//     return d;
//   };
//   const data = await csv(csvUrl, row);

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default multiple;
