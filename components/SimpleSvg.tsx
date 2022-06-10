import React, { useState } from 'react'
import { SVGContainer } from '../typings'


function SimpleSvg({ width, height }: SVGContainer) {
    const initMousePos = { x: width / 2, y: height / 2};
    const [mousePos, setMousePos] = useState(initMousePos);

    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
        const { clientX, clientY } = event;
        setMousePos({ x: clientX, y: clientY });
    };

  return (
    // viewBox - SVG responsive need
    <svg className="svg" width={width} height={height} viewBox="0 0 500 200">
        <text x={50} y={50} textAnchor="start" alignmentBaseline="hanging">Mountain</text>
    </svg>
  )
}

export default SimpleSvg