import { select } from "d3-selection";
import { useEffect, useRef } from "react";
import { Types } from "./data";

interface ICircleProps {
  node: Types.Node;
}

function Circle({ node }: ICircleProps) {
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (ref) {
      select(ref.current).data([node]);
    }
  }, [ref]);

  return (
    <circle
      ref={ref}
      className="node"
      r={node.radiusSize}
      fill={node.fillColor}
    >
      <title>{node.id}</title>
    </circle>
  );
}

export default Circle;

// const circles = svg
//         .selectAll("circle")
//         .data(nodes)
//         .enter()
//         .append("circle")
//         .attr("fill", (node) => node.fillColor || "gray")
//         .attr("r", (node) => node.radiusSize || 10);
