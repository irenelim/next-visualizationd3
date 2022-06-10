import { FeatureCollection, MultiLineString } from "geojson";
import {
  geoNaturalEarth1,
  geoPath,
  GeoPermissibleObjects,
  geoGraticule,
} from "d3-geo";
import { NumberValue, ScaleSequential } from "d3-scale";
import { useMemo } from "react";

interface Props {
  worldAtlas: {
    countries: FeatureCollection;
    // land: FeatureCollection;
    interiors: MultiLineString;
  };
  rowByCountry: Map<any, any>;
  colorScale: ScaleSequential<string, never>;
  colorValue: (d: any) => NumberValue;
  styles: { [key: string]: string };
}

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const missingDataColor = 'gray';

export const Marks = ({
  worldAtlas: { countries, interiors },
  rowByCountry,
  colorScale,
  colorValue,
  styles,
}: // coords,
Props) => {
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
            {countries.features.map((feature, i) => {
              const countryId = feature?.id;
              const d = rowByCountry.get(countryId);
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
