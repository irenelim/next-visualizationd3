import { select } from "d3-selection";
import { useEffect, useRef } from "react";
import Circle from "./Circle";
import { Types } from "./data";
import Label from "./Label";

interface ILabelsProps {
  nodes: Types.Node[];
  // restartDrag: () => void
  // stopDrag: () => void
}

function Labels({ nodes }: ILabelsProps) {
  return (
    <g className="labels">
      {nodes.map((node, i) => (
          <Label key={node.id} node={node} />
      ))}
    </g>
  );
}

export default Labels;
