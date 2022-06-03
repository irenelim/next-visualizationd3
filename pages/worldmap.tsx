import Head from "next/head";
import { json } from 'd3'
import { Topology } from 'topojson-specification';
import { feature, mesh } from 'topojson-client';
import Map from "../components/WorldAtlas";

interface Props {
    data: Topology;
  }

function WorldMap({ data }: Props) {
  const { countries, land }: any = data.objects;
  const geojsonData = {
      // countries: feature(data, countries),
      land: feature(data, land),
      interiors: mesh(data, countries, (a, b) => a !== b)
    };
    
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>World Map</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">
          World Map
        </h1>

        <Map width={960} height={500} data={geojsonData} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  // https://unpkg.com/browse/world-atlas@2.0.2/
    const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

    const topojsonData = await json(jsonUrl);

    return {
        props: {
            data: topojsonData
        }
    }
}

export default WorldMap