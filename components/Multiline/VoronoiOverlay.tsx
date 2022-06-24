import { Delaunay } from "d3-delaunay";
import { Line } from "d3-shape";
import { useMemo } from "react";

type Point = [x: number, y: number];

interface Props {
  onHover: (d: any) => void;
  innerWidth: number;
  innerHeight: number;
  allData: any;
  lineGenerator: any; // Line<[number, number]>;
  margin: { [key: string]: number };
}

function VoronoiOverlay({
  innerWidth,
  innerHeight,
  allData,
  lineGenerator,
  margin,
  onHover,
}: Props) {
  return useMemo(() => {
    const points: Array<Point> = allData.map((d: any) => [
      lineGenerator.x()(d),
      lineGenerator.y()(d),
    ]);
    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([
      0,
      0,
      innerWidth + margin.right,
      innerHeight,
    ]);

    return (
      <g className="voronoi">
        {points.map((point, i) => (
          <path
            key={i}
            // fill="none"
            // stroke="pink"
            d={voronoi.renderCell(i)}
            onMouseEnter={() => onHover(allData[i])}
          />
        ))}
      </g>
    );
  }, [allData, lineGenerator, innerWidth, innerHeight, onHover]);
}

export default VoronoiOverlay;
