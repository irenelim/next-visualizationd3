import React, { MouseEventHandler, useState } from 'react'
import { SVGContainer } from '../typings'

const radius=20;

function FollowPoint({ width, height }: SVGContainer) {
    const initMousePos = { x: width / 2, y: height / 2};
    const [mousePos, setMousePos] = useState(initMousePos);

    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
        const { clientX, clientY } = event;
        setMousePos({ x: clientX, y: clientY });
    };

  return (
    <svg className="svg" width={width} height={height} onMouseMove={handleMouseMove}>
        <circle
            cx={mousePos.x}
            cy={mousePos.y}
            r={radius}
        />
    </svg>
  )
}

export default FollowPoint