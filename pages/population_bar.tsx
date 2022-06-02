import Head from "next/head";
import { csv } from 'd3'
import { csvParse } from 'd3-dsv';
import { CSSColors } from "../typings";
import { DSVRowArray } from 'd3-dsv';
import BarChart from "../components/BarChart";

interface Props {
    data: DSVRowArray;
  }

function bars({ data }: Props) {
    
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Bar chart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">
          Population Bar chart
        </h1>

        <BarChart width={800} height={500} data={data} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
    const csvUrl = 'https://gist.githubusercontent.com/irenelim/de28f475a879183d3c733a76cf86688a/raw/un_population_2019.csv';
    const row = (d: any) => {
      d.Population = +d['2020'] * 1000; // data represented in thousand
      return d;
    };
    const data = await csv(csvUrl, row);

    return {
        props: {
            data: data.slice(0, 10)
        }
    }
}

export default bars