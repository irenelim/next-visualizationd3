import { FeatureCollection, MultiLineString } from "geojson";
import {
  geoNaturalEarth1,
  geoPath,
  GeoPermissibleObjects,
  geoGraticule,
} from "d3-geo";

interface Props {
  data: {
    // countries: FeatureCollection;
    land: FeatureCollection;
    interiors: MultiLineString;
  };
  styles: { [key: string]: string };
}

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ data: { land, interiors }, styles }: Props) => {
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
      
    </g>
  );
};
