import Head from "next/head";
import { csv } from 'd3'
import { DSVRowArray } from 'd3-dsv';
import LineChart from "../components/LineChart";

interface Props {
    data: DSVRowArray;
  }

function lines({ data }: Props) {
    
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Line Chart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">
          Temperature Line Chart
        </h1>

        <LineChart width={800} height={500} data={data} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
    const csvUrl = 'https://gist.githubusercontent.com/irenelim/4acc5f85e7da033efa4afb680cca7e47/raw/temperature.csv';
    const row = (d: any) => {
      d.temperature = +d.temperature;
      // d.timestamp = new Date(d.timestamp);
      return d;
    };
    const data = await csv(csvUrl, row);

    return {
        props: {
            data
        }
    }
}

export default lines