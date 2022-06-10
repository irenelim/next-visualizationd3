import { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { DSVRowArray } from "d3-dsv";

// const dataUrl =
//   "https://gist.githubusercontent.com/curran/470752f12c027f8ff4266e7c96f26a56/raw/share-of-population-infected-with-hiv-ihme.csv";

// const row = (d: any) => {
//   d.aids = +d['Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)'];
//   return d;
// };

function useData(dataUrl: string) {
  const [data, setData] = useState<unknown | null>(null);

  useEffect(() => {
    // csv(dataUrl, row).then(setData);
    csv(dataUrl).then(setData);
  }, []);

  return data;
}

export default useData;
