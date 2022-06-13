import Head from "next/head";
// import { json } from 'd3'
import { Topology } from "topojson-specification";
import { feature, mesh } from "topojson-client";
import ChoroplethMap from "../components/ChoroplethMap";
import useFetch from "../hooks/useFetch";
import useData from "../hooks/useData";
import { useEffect, useState } from "react";
import { Feature, MultiLineString, Point, GeoJsonProperties } from "geojson";
import { DSVRowArray } from "d3-dsv";
import useWindowSize from "../hooks/useWindowSize";
import Home from "../components/Home";

interface Props {
  // data: Topology;
  countries: Feature<Point, GeoJsonProperties>;
  // land: Feature<Point, GeoJsonProperties>;
  // land: FeatureCollection;
  interiors: MultiLineString;
}

const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const selectedYear = '2017';
const iso3166jsonUrl =
  "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/slim-3/slim-3.json";


// function WorldMap({ data }: Props) {
function WorldMap() {
  const { width, height } = useWindowSize();
  // const { data, error }  = useFetchD3Json<Topology>(jsonUrl);
  const { data } = useFetch<Topology>(jsonUrl);
  const { data: codes } = useFetch<DSVRowArray>(iso3166jsonUrl);
  const cities: (DSVRowArray | null)= useData() as DSVRowArray;
  const [worldAtlas, setWorldAtlas] = useState<Props | null>(null);

  useEffect(() => {
    if (data && data.objects) {
      const { countries, land }: any = data.objects;
      const geojsonData: Props = {
        countries: feature(data, countries),
        // land: feature(data, land),
        interiors: mesh(data, countries, (a, b) => a !== b),
      };
      setWorldAtlas(geojsonData);
    }
  }, [data]);

  if (!data || !codes || !cities) {
    return <pre>Loading...</pre>;
  }

  const filteredData = cities.filter((d) => d.Year === selectedYear);
  

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Choropleth Map</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">HIV / AIDS Choropleth Map</h1>
        {worldAtlas && (
          <ChoroplethMap
            width={width}
            height={height}
            worldAtlas={worldAtlas}
            data={filteredData}
            sizeAttribute="aids"
            codes={codes}
          />
        )}
      </main>
    </div>
  );
}

// export async function getStaticProps() {
//   // https://unpkg.com/browse/world-atlas@2.0.2/
//     const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

//     const topojsonData = await json(jsonUrl);

//     return {
//         props: {
//             data: topojsonData
//         }
//     }
// }

export default WorldMap;
