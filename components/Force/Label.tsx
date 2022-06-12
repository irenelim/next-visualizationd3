import { select } from "d3-selection";
import { useEffect, useRef } from "react";
import { Types } from "./data";

interface ILabelProps {
  node: Types.Node;
}

function Label({ node }: ILabelProps) {
  const ref = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (ref) {
      select(ref.current).data([node]);
    }
  }, [ref]);

  return (
    <text
      ref={ref}
      className="label"
      // fill={node.fillColor}
      textAnchor="middle"
      alignmentBaseline="middle"
      style={{ pointerEvents: 'none' }}
    >
      {node.id}
    </text>
  );
}

export default Label;

// attr("text-anchor", "middle")
//         .attr("alignment-baseline", "middle")
//         .style("pointer-events", "none")
