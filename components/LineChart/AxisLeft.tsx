import { ScaleLinear } from "d3-scale";
import { format } from "d3-format";
interface Props {
  yScale: ScaleLinear<number, number, never>;
  innerWidth: number;
  tickOffset: number;
}


const siFormat = format(".3s");

export const AxisLeft = ({ yScale, innerWidth, tickOffset }: Props) => (
  <>
    {yScale.ticks().map((tickValue, i) => (
      <g
        className="tick"
        key={tickValue}
        transform={`translate(0,${yScale(tickValue)})`}
      >
        <line x2={innerWidth} />
        {/* {i===0 && <line x2={innerWidth} />} */}
        <text
          style={{ textAnchor: "end" }}
          dy=".32em"
          x={-tickOffset}
        >
          {siFormat(tickValue)}
        </text>
      </g>
    ))}
  </>
);
