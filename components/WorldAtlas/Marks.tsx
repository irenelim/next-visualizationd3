import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import {
  geoNaturalEarth1,
  geoPath,
  GeoPermissibleObjects,
  geoGraticule,
} from "d3-geo";
import { ScalePower } from "d3";
import { useMemo } from "react";
import { Coords, Dimension, WorldAtlas } from "../../typings";

interface Props<T> {
  // worldAtlas: {
  //   // countries: FeatureCollection;
  //   land: FeatureCollection;
  //   interiors: MultiLineString;
  // };
  worldAtlas: WorldAtlas;
  data: T[];
  sizeScale: ScalePower<number, number, never>;
  sizeValue: (d: T) => number;
  styles: { [key: string]: string };
  coords: Coords<T>;
  dimension: Dimension;
}

export const Marks = <T extends unknown>({
  worldAtlas: { land, interiors },
  data,
  sizeScale,
  sizeValue,
  styles,
  coords,
  dimension,
}: Props<T>) => {
  const projection = geoNaturalEarth1().fitSize(
    [dimension.width, dimension.height],
    land as FeatureCollection<Geometry, GeoJsonProperties>
  );
  const path = geoPath(projection);
  const graticule = geoGraticule();

  return (
    //
    <g className={styles.marks}>
      {useMemo(() => {
        const spherePath = path({ type: "Sphere" } as GeoPermissibleObjects);
        // console.log('render atlas');
        return (
          <>
            <path className={styles.sphere} d={spherePath as string} />
            <path
              className={styles.graticules}
              d={path(graticule()) as string}
            />
            {land!.features.map((feature, i) => (
              <path
                className={styles.land}
                key={feature?.properties?.name || `f${i}`}
                d={path(feature) as string}
              />
            ))}
            <path className={styles.interiors} d={path(interiors) as string} />
          </>
        );
      }, [path, graticule, land, interiors])}
      {data.map((d, i) => {
        const [x, y] = projection(coords(d))!;
        return (
          <circle
            key={`city-${i}`}
            cx={x}
            cy={y}
            r={sizeScale(sizeValue(d))}
            className={styles.spot}
          />
        );
      })}
    </g>
  );
};
