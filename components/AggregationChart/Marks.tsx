import { ScaleLinear, ScaleTime } from 'd3-scale'
import { line, curveNatural } from 'd3-shape'
import { BinnedData } from '../../typings';

interface Props {
    xScale: ScaleTime<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
    data: BinnedData[];
    // data: {
    //     y: number;
    //     x0: number | undefined;
    //     x1: number | undefined;
    // }[]

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
                x={xScale(d.x0 as unknown as Date)}
                y={yScale(d.y)}
                width={xScale(d.x1 as unknown as Date) - xScale(d.x0 as unknown as Date)}
                height={innerHeight - yScale(d.y)}
            >
                <title>{`${tooltipFormat(d.x0 as unknown as Date)} - ${tooltipFormat(d.x1 as unknown as Date)}\n${d.y}`}</title>
            </rect>
        ))}
    </g>
)