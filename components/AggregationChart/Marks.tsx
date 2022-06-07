import { ScaleLinear, ScaleTime } from 'd3-scale'
import { line, curveNatural } from 'd3-shape'

interface Props {
    xScale: ScaleTime<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
    data: any[];

    tooltipFormat: (n: Date) => string;
    innerHeight: number;
}

export const Marks = ({ data, xScale, yScale, tooltipFormat, innerHeight }: Props) => (
    <g className="marks">
        {/* <path
         d={
            line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(curveNatural)
            (data)!
         } 
        /> */}
        {data.map((d, i) => (
            <rect
                // key={Math.floor(100000 + Math.random() * 900000)}
                className="mark"
                key={i}
                x={xScale(d.x0)}
                y={yScale(d.y)}
                width={xScale(d.x1) - xScale(d.x0)}
                height={innerHeight - yScale(d.y)}
            >
                <title>{`${tooltipFormat(d.x0)} - ${tooltipFormat(d.x1)}\n${d.y}`}</title>
            </rect>
        ))}
    </g>
)