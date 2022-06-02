import { ScaleBand } from 'd3-scale'

interface Props {
    yScale: ScaleBand<string>;
}

export const AxisLeft = ({ yScale } : Props) => (
    <>
    {yScale.domain().map(tickValue => (
        <g className="tick">
            <text key={tickValue} style={{textAnchor: 'end'}} dy='.32em' x={-3}
                y={yScale(tickValue)! + yScale.bandwidth() / 2}
            >{tickValue}</text>
        </g>
    ))}
    </>
)