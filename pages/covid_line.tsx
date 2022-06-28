import Head from "next/head";
import { DSVRowArray } from "d3-dsv";
import { format } from 'd3-format';
import { timeParse } from 'd3-time-format';
import LineChart from "../components/LineChart/D3Line";
import useData from "../hooks/useDataGeneric";
import useWindowSize from "../hooks/useWindowSize";
import Home from "../components/Home";

const masterUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const csvUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/65879a43b1a6744529f3c92c435790ecd776117d/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
const sum = (accumulator: number, currentValue: number) => accumulator + currentValue;
const commaFormatter = format(',');

const dateSpecifier ='%m/%d/%y';
const parseDate = timeParse(dateSpecifier);
const transform = (raw: DSVRowArray<string>) => {
  const days = raw.columns.slice(-60);
  return days.map(day => ({
      date: parseDate(day.toString()),
      deathTotal: raw.map(d => +d[day]!).reduce(sum, 0)
    })
  )
};

function lines() {
  const { width, height } = useWindowSize();
  const rawData = useData(csvUrl);

  // 12/31/21: "7356" ...
  // Country/Region: "Afghanistan"
  // Lat: "33.93911"
  // Long: "67.709953"
  // Province/State: "" or string

  if (!rawData) {
    return <pre>Loading...</pre>;
  }
  const latestDateColumn = rawData.columns[rawData.columns.length - 1];
  const deathTotal = rawData.map(d => +d[latestDateColumn]!).reduce(sum, 0);

  const data = transform(rawData);
  // console.log(data);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Line Chart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">Covid Line Chart</h1>

        <pre>
          {`${commaFormatter(deathTotal)} on ${latestDateColumn.toString()}`}
        </pre>

        <LineChart
          width={width}
          height={height}
          data={data}
          xAttribute="date"
          yAttribute="deathTotal"
          xAxisLabel="Time"
          yAxisLabel="Total Death"
          xTimeFormat="%d %b"
        />
      </main>
    </div>
  );
}

// export async function getStaticProps() {
//   const csvUrl =
//     "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/65879a43b1a6744529f3c92c435790ecd776117d/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
//   // const row = (d: any) => {
//   //   d.temperature = +d.temperature;
//   //   // d.timestamp = new Date(d.timestamp);
//   //   return d;
//   // };
//   // const data = await csv(csvUrl, row);
//   const data = await csv(csvUrl);


//   return {
//     props: {
//       data,
//     },
//   };
// }

export default lines;
