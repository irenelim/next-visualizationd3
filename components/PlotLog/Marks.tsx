import { ScaleLinear, ScaleTime } from 'd3-scale'

interface Props {
    xScale: ScaleTime<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
    data: any[];
    xValue: any;
    yValue: any;
    tooltipFormat: (n: Date) => string
    circleRadius: number
}

export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius }: Props) => (
    <g className="marks">
        {data.map((d, i) => (
            <circle
                // key={Math.floor(100000 + Math.random() * 900000)}
                key={i}
                cx={xScale(xValue(d))}
                cy={yScale(yValue(d))}
                r={circleRadius}
            >
                <title>{yValue(d)}</title>
            </circle>
        ))}
    </g>
)