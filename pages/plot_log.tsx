import Head from "next/head";
import { csv } from "d3-fetch";
import { DSVRowArray } from "d3-dsv";
import PlotLog from "../components/PlotLog";
import useWindowSize from "../hooks/useWindowSize";
import Home from "../components/Home";

interface Props {
  data: DSVRowArray;
}

function plots({ data }: Props) {
  const { width, height } = useWindowSize();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Plot ScaleLog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">Plot Chart - ScaleLog</h1>

        <PlotLog
          width={width}
          height={height}
          data={data}
          xAttribute="Reported Date"
          yAttribute="Total Dead and Missing"
          xAxisLabel="Reported Date"
          yAxisLabel="Total Dead and Missing"
        />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const csvUrl =
    "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";
  const row = (d: any) => {
    d["Total Dead and Missing"] = +d["Total Dead and Missing"];
    // d["Reported Date"] = new Date(d["Reported Date"]);
    d.coords = d["Location Coordinates"]
      .split(",")
      .map((d: string) => +d)
      .reverse();
    return d;
  };
  const data = await csv(csvUrl, row);

  return {
    props: {
      data,
    },
  };
}

export default plots;
