import { ScaleLinear } from 'd3-scale'

interface Props {
    yScale: ScaleLinear<number, number, never>;
    innerWidth: number;
    tickOffset: number;
}

export const AxisLeft = ({ yScale, innerWidth, tickOffset } : Props) => (
    <>
    {yScale.ticks().map(tickValue => (
        <g className="tick" key={tickValue} transform={`translate(0,${yScale(tickValue)})`} >
            <line x2={innerWidth} />
            <text style={{textAnchor: 'end'}} dy='.32em' x={-tickOffset}
                y={yScale(tickValue)}
            >{tickValue}</text>
        </g>
    ))}
    </>
)