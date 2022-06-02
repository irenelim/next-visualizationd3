import React, { MouseEventHandler, useState } from "react";
import { SVGContainer, CSSColors } from "../typings";
import { arc, pie } from "d3-shape";
import { DSVRowArray } from 'd3-dsv';

interface Props extends SVGContainer{
  cssColors: CSSColors[];
};

function ColorPie({ width, height, cssColors }: Props) {
  const centerX = width / 2;
  const centerY = height / 2;
  const initMousePos = { x: centerX, y: centerY };
  const [mousePos, setMousePos] = useState(initMousePos);

  const pieArc = arc().innerRadius(0).outerRadius(width);
  const colorPie = pie().value(1);

  // const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
  //     const { clientX, clientY } = event;
  //     setMousePos({ x: clientX, y: clientY });
  // };

  return (
    <svg className="svg" width={width} height={height}>
      <g transform={`translate(${centerX},${centerY})`}>
      {colorPie(cssColors as any)
        .map((d) => {
          // const pp = ({
          //   startAngle: (i / cssColors.length) * 2 * Math.PI,
          //   endAngle: ((i + 1) / cssColors.length) * 2 * Math.PI,
          // });
          return(
            <path
              key={(d.data as { [key: string]: any })["Keyword"]}
              fill={(d.data as { [key: string]: any })["RGB hex value"]}
              d={pieArc(d as any)!}
            />
          );
        })}
        {/* {cssColors.map((d, i) => {
          const pp = ({
            startAngle: (i / cssColors.length) * 2 * Math.PI,
            endAngle: ((i + 1) / cssColors.length) * 2 * Math.PI,
          });
          return(
            <path
              key={d.Keyword}
              fill={d["RGB hex value"]}
              d={pieArc(pp as any)!}
            />
          );
        })} */}
      </g>
    </svg>
  );
}

export default ColorPie;
