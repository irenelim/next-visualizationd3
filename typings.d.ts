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

export type ParsedRow = Record<string, string | number | undefined>;

export type Data = {
  [key: string]: string | number | Date;
};

export type DataArray = Data[];

export type Range<T> = [T, T];

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
  land: FeatureCollection<Geometry, GeoJsonProperties>;
  interiors: MultiLineString;
}

export type TopoObject = {
  countries: GeometryCollection<GeoJsonProperties>;
  land: GeometryCollection<GeoJsonProperties>;
};

export interface City {
  city: string;
  lat: number;
  lng: number;
  country: string;
  population: number;
}

export type Coords = (d: City) => [number, number]; //[lng, lat]
export type Dimension = {
  width: number;
  height: number;
};
