import { Bin } from "d3";
import {
  Feature,
  FeatureCollection,
  MultiLineString,
  Point,
  GeoJsonProperties,
  Geometry,
  GeometryCollection,
} from "geojson";

export type Datum<T> = {
  [TProp in keyof T]: string;
};

export type ParsedRow = Record<string, string | number | unknown | undefined>;

export type Data = {
  [key: string]: string | number | Date;
};

export type DataArray = Data[];

export type Range<T> = [T, T];

export type Point = [x: number, y: number];

export interface SVGContainer {
  width: number;
  height: number;
}
export interface CSSColors {
  Keyword: string;
  Specification: string;
  ["RGB hex value"]: string;
}

export interface WorldAtlas {
  //   land: Feature<Point, GeoJsonProperties>;
  countries?: FeatureCollection<Geometry, GeoJsonProperties>;
  land?: FeatureCollection<Geometry, GeoJsonProperties>;
  interiors: MultiLineString;
}

export type TopoObject = {
  countries: GeometryCollection<GeoJsonProperties>;
  land: GeometryCollection<GeoJsonProperties>;
};

export interface City {
  // worldmap
  city: string;
  lat: number;
  lng: number;
  country: string;
  population: number;
}

export interface MissingMigrant {
  // multiple
  ["Reported Date"]: string; //date string: October 07, 2019
  ["Total Dead and Missing"]: number;
  ["Location Coordinates"]: string; // '35.210549549164, 12.180541076066'
  coords: [number, number]; // [12.180541076066, 35.210549549164]
}

export interface AidsData {
  Code: string; // "AFG"
  Entity: string; //"Afghanistan"
  ["Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)"]: string; // "0.0065200175890799995"
  Year: string; // "1990"
  aids: number; // 0.0065200175890799995
}

export interface CountryCode {
  name: string;
  ['alpha-3']: string;
  ['country-code']: string;
}

export interface CovidDeath {
  date: Date | null;
  deathTotal: number;
  countryName?: string;
}

export type Coords<T> = (d: T) => [number, number]; //[lng, lat]
export type Dimension = {
  width: number;
  height: number;
};

// export type BinnedData<T> = { y: number } & Bin<T, Date>
export type BinnedData = {
  y: number;
  x0: number | undefined;
  x1: number | undefined;
};
