import { useEffect, useState } from "react";
import { csv } from "d3-fetch";

const row = (d: any) => {
  d["Total Dead and Missing"] = +d["Total Dead and Missing"];
  // d["Reported Date"] = new Date(d["Reported Date"]);
  d.coords = d["Location Coordinates"]
    .split(",")
    .map((d: string) => +d)
    .reverse();
  return d;
};

function useData(dataUrl: string) {
  const [data, setData] = useState<unknown | null>(null);

  useEffect(() => {
    csv(dataUrl, row).then(setData);
  }, []);

  return data;
}

export default useData;
