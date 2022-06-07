import { ScaleTime } from "d3-scale";

interface Props {
  xScale: ScaleTime<number, number, never>;
  innerHeight: number;
  tickFormat: (n: Date) => string;
  tickOffset: number;
  styles?: { [key: string]: string };
}

export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3, styles }: Props) => (
  <>
    {xScale.ticks().map((tickValue) => (
      <g
        key={tickValue.toISOString()}
        className="tick"
        transform={`translate(${xScale(tickValue)},0)`}
      >
        <line y2={innerHeight} {...(styles ? { className: styles.tickLine } : {})} />
        <text
          style={{ textAnchor: "middle" }}
          dy=".71em"
          y={innerHeight + tickOffset}
          {...styles ? { className : styles.tickText} : {}}
        >
          {tickFormat(tickValue)}
        </text>
      </g>
    ))}
  </>
);
