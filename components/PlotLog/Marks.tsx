import { ScaleLinear, ScaleTime } from "d3-scale";

interface Props {
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  data: any[];
  xValue: any;
  yValue: any;
  tooltipFormat: (n: Date) => string;
  circleRadius: number;
}

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius,
}: Props) => (
  <g className="marks">
    {data.map((d, i) => {
      const y = yScale(yValue(d)); //if 0 will cause NaN to cy
      return (
        <circle
          // key={Math.floor(100000 + Math.random() * 900000)}
          key={i}
          cx={xScale(xValue(d))}
          cy={isNaN(y) ? 0 : y}
          r={circleRadius}
        >
          <title>{yValue(d)}</title>
        </circle>
      );
    })}
  </g>
);
