import { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { DSVRowString } from "d3-dsv";
import { City } from "../typings";


const citiesUrl =
  "https://gist.githubusercontent.com/mmhuntsberry/7878d234cf54df81d91e31e665a034db/raw/worldcities.csv";

const row = (d: DSVRowString<keyof City>) => {
  const dd: City = {
    country: d.country!,
    city: d.city!,
    lat: +d.lat!,
    lng: +d.lng!,
    population: +d.population!
  };
  return dd;
};

function useCities() {
  const [data, setData] = useState<City[] | null>(null);

  useEffect(() => {
    csv(citiesUrl, row).then(setData);
  }, []);

  return data;
}

export default useCities;
