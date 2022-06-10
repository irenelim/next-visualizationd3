import { useEffect, useRef } from "react";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";
import { ScaleLogarithmic } from "d3-scale";

interface Props {
    yScale: ScaleLogarithmic<number, number, never>;
    innerWidth: number;
    innerHeight: number;
}

function YAxis({ yScale, innerWidth, innerHeight }: Props) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
        const yAxisG = select(ref.current);
        // console.log(yScale.ticks());
        const yAxis = axisLeft(yScale)
            .tickSize(-innerWidth)
            .tickPadding(8)
            .ticks(10, '~s');
        yAxisG.call(yAxis);
    }
  }, [innerWidth, innerHeight]);

  return <g ref={ref} />;
}

export default YAxis;
