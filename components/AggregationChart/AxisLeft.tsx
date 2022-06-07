import { ScaleLinear } from "d3-scale";

interface Props {
  yScale: ScaleLinear<number, number, never>;
  innerWidth: number;
  tickOffset: number;
  styles?: { [key: string]: string };
}

export const AxisLeft = ({ yScale, innerWidth, tickOffset, styles }: Props) => {

  return (
    <>
      {yScale.ticks().map((tickValue) => (
        <g
          className="tick"
          key={tickValue}
          transform={`translate(0,${yScale(tickValue)})`}
        >
          <line x2={innerWidth} {...(styles ? { className: styles.tickLine } : {})} />
          <text
            style={{ textAnchor: "end" }}
            dy=".32em"
            x={-tickOffset}
            {...(styles ? { className: styles.tickText } : {})}
          >
            {tickValue}
          </text>
        </g>
      ))}
    </>
  );
};
