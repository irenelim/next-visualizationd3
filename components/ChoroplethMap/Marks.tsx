import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import {
  geoNaturalEarth1,
  geoPath,
  GeoPermissibleObjects,
  geoGraticule,
} from "d3-geo";
import { ScaleSequential } from "d3-scale";
import { useMemo } from "react";
import { AidsData, Dimension, WorldAtlas } from "../../typings";

interface Props<T> {
  worldAtlas: WorldAtlas;
  rowByCountry: Map<string, T>;
  colorScale: ScaleSequential<string, never>;
  colorValue: (d: T) => number;
  styles: { [key: string]: string };
  dimension: Dimension;
}

const missingDataColor = "gray";

export const Marks = <T extends AidsData>({
  worldAtlas: { countries, interiors },
  rowByCountry,
  colorScale,
  colorValue,
  styles,
  dimension,
}: Props<T>) => {
  const projection = geoNaturalEarth1().fitSize(
    [dimension.width, dimension.height],
    countries as FeatureCollection<Geometry, GeoJsonProperties>
  );
  const path = geoPath(projection);
  const graticule = geoGraticule();

  return (
    <g className={styles.marks}>
      {useMemo(() => {
        const spherePath = path({ type: "Sphere" } as GeoPermissibleObjects);
        return (
          <>
            <path className={styles.sphere} d={spherePath as string} />
            <path
              className={styles.graticules}
              d={path(graticule()) as string}
            />
            {countries!.features.map((feature, i) => {
              const countryId = feature?.id;
              const d = rowByCountry.get(countryId as string);
              return (
                <path
                  // className={styles.land}
                  key={feature?.properties?.name || `f${i}`}
                  d={path(feature) as string}
                  fill={d ? colorScale(colorValue(d)) : missingDataColor}
                />
              );
            })}
            <path className={styles.interiors} d={path(interiors) as string} />
          </>
        );
      }, [path, graticule, countries, interiors])}
    </g>
  );
};
