import { ScaleTime } from "d3-scale";

interface Props {
  xScale: ScaleTime<number, number, never>;
  innerHeight: number;
  value: Date;
  styles: { [key: string]: string };
  xAxisTickFormat: (date: Date) => string
}

function XMarkerLine({ value, xScale, innerHeight, styles, xAxisTickFormat }: Props) {
  const markerLineX = xScale(value);
  const markerLineY1 = 0;
  const markerLineY2 = innerHeight;
  return (
    <>
      <line
        className={styles.markerLine}
        x1={markerLineX}
        y1={markerLineY1}
        x2={markerLineX}
        y2={markerLineY2}
      />
      <text
        className={styles.markerText}
        textAnchor="middle"
        alignmentBaseline="hanging"
        x={markerLineX}
        y={markerLineY2}
      >
        {xAxisTickFormat(value)}
      </text>
    </>
  );
}

export default XMarkerLine;
