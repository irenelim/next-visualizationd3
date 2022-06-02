import { ScaleLinear } from 'd3-scale'

interface Props {
    xScale: ScaleLinear<number, number, never>;
    innerHeight: number;
    tickFormat: (n: number) => string;
};

export const AxisBottom = ({ xScale, innerHeight, tickFormat }: Props) => (
    <>
    {xScale.ticks().map(tickValue => (
        <g key={tickValue} className="tick" transform={`translate(${xScale(tickValue)},0)`}>
            <line y2={innerHeight} />
            <text style={{textAnchor: 'middle'}} dy='.71em' y={innerHeight + 3}>
                {tickFormat(tickValue)}
            </text>
        </g>
    ))}
    </>
);