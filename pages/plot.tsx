import Head from "next/head";
import { csv } from 'd3'
import { csvParse } from 'd3-dsv';
import { CSSColors } from "../typings";
import { DSVRowArray } from 'd3-dsv';
import BarChart from "../components/BarChart";
import PlotChart from "../components/ScatterPlot";

interface Props {
    data: DSVRowArray;
  }

function plots({ data }: Props) {
    
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Scatter Plot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">
          Iris Scatter Plot Chart
        </h1>

        <PlotChart width={800} height={500} data={data} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
    const csvUrl = 'https://gist.githubusercontent.com/thomasnield/03cf7c08016b514086ac8a9fdc07cc65/raw/iris.csv';
    const row = (d: any) => {
      d.sepal_length = +d.sepal_length;
      d.sepal_width = +d.sepal_width;
      d.petal_length = +d.petal_length;
      d.sepal_width = +d.sepal_width;
      return d;
    };
    const data = await csv(csvUrl, row);

    return {
        props: {
            data
        }
    }
}

export default plots