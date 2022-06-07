import Head from "next/head";
// import { json } from 'd3'
import { Topology } from "topojson-specification";
import { feature, mesh } from "topojson-client";
import Map from "../components/WorldAtlas";
import useFetch from "../hooks/useFetch";
import useCities, { City } from "../hooks/useCities";
import { useEffect, useState } from "react";
import { Feature, MultiLineString, Point, GeoJsonProperties } from "geojson";
interface Props {
  // data: Topology;
  land: Feature<Point, GeoJsonProperties>;
  // land: FeatureCollection;
  interiors: MultiLineString;
}

const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
// const citiesUrl = 'https://gist.githubusercontent.com/mmhuntsberry/7878d234cf54df81d91e31e665a034db/raw/worldcities.csv';

// function WorldMap({ data }: Props) {
function WorldMap() {
  // const { data, error }  = useFetchD3Json<Topology>(jsonUrl);
  const { data } = useFetch<Topology>(jsonUrl);
  const cities: City[] | null = useCities();
  const [worldAtlas, setWorldAtlas] = useState<Props | null>(null);

  useEffect(() => {
    if (data && data.objects) {
      const { countries, land }: any = data.objects;
      const geojsonData: Props = {
        // countries: feature(data, countries),
        land: feature(data, land),
        interiors: mesh(data, countries, (a, b) => a !== b),
      };
      setWorldAtlas(geojsonData);
    }
  }, [data]);

  if (!data || !cities) {
    return <pre>Loading...</pre>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>World Map</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">World Map</h1>
        {worldAtlas && (
          <Map
            width={960}
            height={500}
            worldAtlas={worldAtlas}
            cities={cities}
            sizeAttribute="population"
            coords={(d: City) => [d.lng, d.lat]}
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
