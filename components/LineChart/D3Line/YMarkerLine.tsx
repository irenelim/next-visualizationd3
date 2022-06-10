import { ScaleLinear } from "d3-scale";
import { format } from "d3-format";

interface Props {
  yScale: ScaleLinear<number, number, never>;
  innerWidth: number;
  value: number;
  styles: { [key: string]: string };
}

const siFormat = format(".2s");

function YMarkerLine({ value, yScale, innerWidth, styles }: Props) {
  const markerLineY = yScale(value);
  const markerLineX1 = 0;
  const markerLineX2 = innerWidth;
  return (
    <>
      <line
        className={styles.markerLine}
        x1={markerLineX1}
        y1={markerLineY}
        x2={markerLineX2}
        y2={markerLineY}
      />
      <text
        className={styles.markerText}
        textAnchor="end"
        alignmentBaseline="middle"
        x={markerLineX1 - 5}
        y={markerLineY}
      >
        {siFormat(value)}
      </text>
    </>
  );
}

export default YMarkerLine;
