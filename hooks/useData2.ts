import { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { DSVRowString } from "d3";
import { MissingMigrant, ParsedRow } from "../typings";

const row = (d: DSVRowString<keyof MissingMigrant>) => {
  const dd: ParsedRow = { ["Reported Date"]: d["Reported Date"]! };
  dd["Total Dead and Missing"] = +d["Total Dead and Missing"]!;
  // d["Reported Date"] = new Date(d["Reported Date"]);
  dd.coords = d["Location Coordinates"]!
    .split(",")
    .map((d: string) => +d)
    .reverse();
  return dd;
};

function useData(dataUrl: string) {
  const [data, setData] = useState<unknown | null>(null);

  useEffect(() => {
    csv(dataUrl, row).then(setData);
  }, []);

  return data;
}

export default useData;
