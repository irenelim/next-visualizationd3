import { ScaleLinear, ScaleBand } from 'd3-scale'

interface Props {
    xScale: ScaleLinear<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
    data: any[];
    xValue: any;
    yValue: any;
    tooltipFormat: (n: number) => string
    circleRadius: number
}

export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius }: Props) => (
    <>
        {data.map((d) => (
            <circle
                key={Math.floor(100000 + Math.random() * 900000)}
                className="mark"
                cx={xScale(xValue(d))}
                cy={yScale(yValue(d))}
                r={circleRadius}
            >
                <title>{tooltipFormat(xValue(d))}</title>
            </circle>
        ))}
    </>
)