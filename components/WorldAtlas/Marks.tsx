import { FeatureCollection, MultiLineString } from "geojson";
import {
  geoNaturalEarth1,
  geoPath,
  GeoPermissibleObjects,
  geoGraticule,
} from "d3-geo";
import { ScalePower } from "d3";
import { useMemo } from "react";
import { City, Coords, Dimension, WorldAtlas } from "../../typings";

interface Props {
  // worldAtlas: {
  //   // countries: FeatureCollection;
  //   land: FeatureCollection;
  //   interiors: MultiLineString;
  // };
  worldAtlas: WorldAtlas;
  data: City[];
  sizeScale: ScalePower<number, number, never>;
  sizeValue: (d: City) => number;
  styles: { [key: string]: string };
  coords: Coords;
  dimension: Dimension;
}

export const Marks = ({
  worldAtlas: { land, interiors },
  data,
  sizeScale,
  sizeValue,
  styles,
  coords,
  dimension,
}: Props) => {
  const projection = geoNaturalEarth1().fitSize(
    [dimension.width, dimension.height],
    land
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
            {land.features.map((feature, i) => (
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
