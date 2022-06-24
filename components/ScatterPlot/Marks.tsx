import { ScaleLinear, ScaleOrdinal } from 'd3-scale'
import { Data, DataArray } from '../../typings';

interface Props {
    xScale: ScaleLinear<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
    data: DataArray;
    xValue: (d: Data) => number;
    yValue: (d: Data) => number;
    tooltipFormat: (n: number) => string;
    circleRadius: number;
    colorScale?: ScaleOrdinal<string, string, never>;
    colorValue?: any;
}

export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius, colorScale, colorValue }: Props) => (
    <>
        {data.map((d, i) => (
            <circle
                // key={Math.floor(100000 + Math.random() * 900000)}
                key={i}
                // className="mark"
                cx={xScale(xValue(d))}
                cy={yScale(yValue(d))}
                r={circleRadius}
                {...((colorScale && colorValue) ? { fill: colorScale(colorValue(d)) } : {} )}
            >
                <title>{tooltipFormat ? tooltipFormat(xValue(d)) : yValue(d)}</title>
            </circle>
        ))}
    </>
)