import Head from "next/head";
import { csv } from "d3-fetch";
import { DSVRowArray } from "d3-dsv";
import BarChart from "../components/BarChart";
import useWindowSize from "../hooks/useWindowSize";
import Home from "../components/Home";

interface Props {
  data: DSVRowArray;
}

function bars({ data }: Props) {
  const { width, height } = useWindowSize();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Bar chart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">Population Bar chart</h1>

        <BarChart width={width} height={height} data={data} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const csvUrl =
    "https://gist.githubusercontent.com/irenelim/de28f475a879183d3c733a76cf86688a/raw/un_population_2019.csv";
  const row = (d: any) => {
    d.Population = +d["2020"] * 1000; // data represented in thousand
    return d;
  };
  const data = await csv(csvUrl, row);

  return {
    props: {
      data: data.slice(0, 10),
    },
  };
}

export default bars;
