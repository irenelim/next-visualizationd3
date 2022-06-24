import { ScaleLinear, ScaleBand } from 'd3-scale'
import { Data, DataArray } from '../../typings';

interface Props {
    xScale: ScaleLinear<number, number, never>;
    yScale: ScaleBand<string>;
    data: DataArray;
    xValue: (d: Data) => number;
    yValue: (d: Data) => string;
    tooltipFormat: (n: number) => string
}

export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat }: Props) => (
    <>
        {data.map((d) => {
            const width = xScale(xValue(d));
            return <rect
                key={yValue(d)}
                className="mark"
                x={0}
                y={yScale(yValue(d))}
                width={width < 0 ? 0 : width}
                height={yScale.bandwidth()}
            >
                <title>{tooltipFormat(xValue(d))}</title>
            </rect>
        }
        )}
    </>
)