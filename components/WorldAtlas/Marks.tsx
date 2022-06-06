import { FeatureCollection, MultiLineString, Point } from "geojson";
import {
  geoNaturalEarth1,
  geoPath,
  GeoPermissibleObjects,
  geoGraticule,
} from "d3-geo";
import { City } from "../../hooks/useCities";
import { ScalePower } from "d3";

interface Props {
  worldAtlas: {
    // countries: FeatureCollection;
    land: FeatureCollection;
    interiors: MultiLineString;
  };
  cities: City[];
  sizeScale: ScalePower<number, number, never>;
  sizeValue: (d: City) => number;
  styles: { [key: string]: string };
}

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
  worldAtlas: { land, interiors },
  cities,
  sizeScale,
  sizeValue,
  styles,
}: Props) => {
  const spherePath = path({ type: "Sphere" } as GeoPermissibleObjects);

  return (
    <g className={styles.marks}>
      <path className={styles.sphere} d={spherePath as string} />
      <path className={styles.graticules} d={path(graticule()) as string} />
      {land.features.map((feature, i) => (
        <path
          className={styles.land}
          key={feature?.properties?.name || `f${i}`}
          d={path(feature) as string}
        />
      ))}
      <path className={styles.interiors} d={path(interiors) as string} />
      {cities.map((d, i) => {
        const [x, y] = projection([d.lng, d.lat]) as [number, number];
        return (
          <circle
            key={`${d.city}-${i}`}
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
