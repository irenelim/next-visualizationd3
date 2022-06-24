import { ScaleLinear, ScaleTime } from 'd3-scale'
import { line, curveNatural } from 'd3-shape'
import { Data, DataArray } from '../../typings';

interface Props {
    xScale: ScaleTime<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
    data: DataArray;
    xValue: (d: Data) => Date;
    yValue: (d: Data) => number;
    tooltipFormat: (n: Date) => string
    circleRadius: number
}

export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius }: Props) => (
    <g className="marks">
        <path
         d={
            line<Data>()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(curveNatural)
            (data)!
         } 
        />
        {data.map((d) => (
            <circle
                key={Math.floor(100000 + Math.random() * 900000)}
                cx={xScale(xValue(d))}
                cy={yScale(yValue(d))}
                r={circleRadius}
            >
                <title>{`${yValue(d)}\n${xValue(d)}`}</title>
            </circle>
        ))}
    </g>
)