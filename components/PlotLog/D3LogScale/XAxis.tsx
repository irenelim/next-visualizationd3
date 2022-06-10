import { useEffect, useRef } from "react";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import { ScaleTime } from "d3-scale";

interface Props {
    xScale: ScaleTime<number, number, never>;
    innerWidth: number;
    innerHeight: number;
}

function XAxis({ xScale, innerWidth, innerHeight }: Props) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
        const xAxisG = select(ref.current);
        const xAxis = axisBottom(xScale)
            .tickSize(-innerHeight)
            .tickPadding(8);
        xAxisG.call(xAxis);
    }
  }, [innerWidth, innerHeight]);

  return <g ref={ref} transform={`translate(0,${innerHeight})`} />;
}

export default XAxis;
