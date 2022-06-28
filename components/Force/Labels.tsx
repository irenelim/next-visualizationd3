import { Types } from "./data";
import Label from "./Label";

interface ILabelsProps {
  nodes: Types.Node[];
}

function Labels({ nodes }: ILabelsProps) {

  return (
    <g className="labels">
      {nodes.map((node, i) => (
          // <Label key={node.id} node={node} />
          <Label key={i} node={node} />
      ))}
    </g>
  );
}

export default Labels;
