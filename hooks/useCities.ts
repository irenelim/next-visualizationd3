import { useEffect, useState } from "react";
import { csv } from "d3-fetch";
export interface City {
  city: string;
  lat: number;
  lng: number;
  country: string;
  population: number;
}

const citiesUrl =
  "https://gist.githubusercontent.com/mmhuntsberry/7878d234cf54df81d91e31e665a034db/raw/worldcities.csv";

const row = (d: any) => {
  d.lat = +d.lat;
  d.lng = +d.lng;
  d.population = +d.population;
  return d;
};

function useCities() {
  const [data, setData] = useState<City[] | null>(null);

  useEffect(() => {
    csv(citiesUrl, row).then(setData);
  }, []);

  return data;
}

export default useCities;
