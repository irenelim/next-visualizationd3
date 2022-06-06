import { ScaleOrdinal } from "d3-scale";

interface Props {
  colorScale: ScaleOrdinal<string, unknown, never>;
  tickSpacing?: number;
  tickSize?: number;
  tickTextOffset?: number;
  onHover: (d: string | null) => void;
  hoveredValue: string | null;
  fadeOpacity: number
}

function ColorLegend({
  colorScale,
  tickSpacing = 20,
  tickSize = 10,
  tickTextOffset = 20,
  onHover,
  hoveredValue,
  fadeOpacity
}: Props) {
  return (
    <>
      {colorScale.domain().map((domainVal, i) => (
        <g
          key={domainVal}
          className="tick"
          transform={`translate(0, ${i * tickSpacing})`}
          onMouseEnter={() => onHover(domainVal)}
          onMouseOut={() => onHover(null)}
          opacity={hoveredValue && domainVal !== hoveredValue ? fadeOpacity : 1}
        >
          <circle fill={colorScale(domainVal) as string} r={tickSize} />
          <text x={tickTextOffset} dy=".32em">
            {domainVal}
          </text>
        </g>
      ))}
    </>
  );
}

export default ColorLegend;
