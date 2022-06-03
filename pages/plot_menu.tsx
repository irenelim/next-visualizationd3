import Head from "next/head";
import { useState } from "react";
import { csv } from "d3";
import { DSVRowArray } from "d3-dsv";
import PlotChart from "../components/ScatterPlot";
// import NativeSelect from "../components/Select/NativeSelect";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

interface Props {
  data: DSVRowArray;
}

const getLabel = (value: string) =>
  attributes.find((x) => x.value === value)!.label;

const attributes = [
  { value: "sepal_length", label: "Sepal Length" },
  { value: "sepal_width", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Petal Width" },
  { value: "species", label: "Species" },
];
const initialXAttribute = "petal_length";
const initialYAttribute = "sepal_width";

function plot_menu({ data }: Props) {
  const [xAttribute, setXAttribute] = useState<string>(initialXAttribute);
  const [yAttribute, setYAttribute] = useState<string>(initialYAttribute);

  const xAxisLabel = getLabel(xAttribute);
  const yAxisLabel = getLabel(yAttribute);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Scatter Plot with Selects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">Plot Chart with Selects</h1>
        {/* <NativeSelect
          options={attributes}
          id="x-selection"
          label="X"
          selectedValue={xAttribute}
          onSelectedValueChange={setXAttribute}
        />
        <NativeSelect
          options={attributes}
          id="y-selection"
          label="Y"
          selectedValue={yAttribute}
          onSelectedValueChange={setYAttribute}
        /> */}
        <div className="flex items-center my-5">
          <label className="dropdown-label text-[1em] mx-2">X</label>
          <Dropdown
            options={attributes}
            //   id="x-selection"
            //   label="X"
            value={xAttribute}
            onChange={({ value }) => setXAttribute(value)}
          />
          <label className="dropdown-label text-[1em] mx-2 ml-20">Y</label>
          <Dropdown
            options={attributes}
            //   id="y-selection"
            //   label="Y"
            value={yAttribute}
            onChange={({ value }) => setYAttribute(value)}
          />
        </div>

        <PlotChart
          width={800}
          height={500}
          data={data}
          xAttribute={xAttribute}
          yAttribute={yAttribute}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const csvUrl =
    "https://gist.githubusercontent.com/thomasnield/03cf7c08016b514086ac8a9fdc07cc65/raw/iris.csv";
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
      data,
    },
  };
}

export default plot_menu;
