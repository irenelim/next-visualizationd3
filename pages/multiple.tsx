import Head from "next/head";
import { csv } from "d3-fetch";
import { DSVRowArray } from "d3-dsv";
import AggChart from "../components/AggregationChart";

interface Props {
  data: DSVRowArray;
}

function lines({ data }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Multiple Chart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">Missing Migrant</h1>

        <AggChart
          width={800}
          height={500}
          data={data}
          xAttribute="Reported Date"
          yAttribute="Total Dead and Missing"
          xAxisLabel="Reported Date"
          yAxisLabel="Total Dead and Missing"
          xTimeFormat="%d/%m/%Y"
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
    return d;
  };
  const data = await csv(csvUrl, row);

  return {
    props: {
      data,
    },
  };
}

export default lines;
