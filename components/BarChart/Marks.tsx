import { ScaleLinear, ScaleBand } from 'd3-scale'

interface Props {
    xScale: ScaleLinear<number, number, never>;
    yScale: ScaleBand<string>;
    data: any[];
    xValue: any;
    yValue: any;
    tooltipFormat: (n: number) => string
}

export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat }: Props) => (
    <>
        {data.map((d) => (
            <rect
                key={yValue(d)}
                className="mark"
                x={0}
                y={yScale(yValue(d)!)}
                width={xScale(xValue(d))}
                height={yScale.bandwidth()}
            >
                <title>{tooltipFormat(xValue(d))}</title>
            </rect>
        ))}
    </>
)