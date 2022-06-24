import Head from "next/head";
import { csv } from 'd3-fetch'
import { DSVRowString } from 'd3-dsv';
import PlotChart from "../components/ScatterPlot";
import useWindowSize from "../hooks/useWindowSize";
import Home from "../components/Home";
import { DataArray, ParsedRow } from "../typings";

interface Props {
  data: DataArray;
}

interface Columns {
  sepal_length: string;
  sepal_width: string;
  petal_length: string;
  petal_width: string;
  species: string;
}

function plots({ data }: Props) {
  const { width, height } = useWindowSize();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Scatter Plot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">
          Iris Scatter Plot Chart
        </h1>

        <PlotChart width={width} height={height} data={data} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
    const csvUrl = 'https://gist.githubusercontent.com/thomasnield/03cf7c08016b514086ac8a9fdc07cc65/raw/iris.csv';
    const row = (d: DSVRowString<keyof Columns>) => {
      const dd: ParsedRow = { species: d.species};
      dd.sepal_length = +d.sepal_length!;
      dd.sepal_width = +d.sepal_width!;
      dd.petal_length = +d.petal_length!;
      dd.petal_width = +d.petal_width!;
      return dd;
    };
    const data = await csv(csvUrl, row);

    return {
        props: {
            data
        }
    }
}

export default plots