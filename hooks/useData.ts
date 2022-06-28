import { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { DSVRowString } from "d3";
import { AidsData, ParsedRow } from "../typings";

const dataUrl =
  "https://gist.githubusercontent.com/curran/470752f12c027f8ff4266e7c96f26a56/raw/share-of-population-infected-with-hiv-ihme.csv";

const row = (d: DSVRowString<keyof AidsData>) => {
  const dd: ParsedRow = d;
  dd.aids = +d['Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)']!;
  return dd;
};

function useData() {
  const [data, setData] = useState<unknown | null>(null);

  useEffect(() => {
    csv(dataUrl, row).then(setData);
  }, []);

  return data;
}

export default useData;
