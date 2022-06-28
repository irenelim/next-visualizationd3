import { select } from "d3-selection";
import { scaleOrdinal } from 'd3-scale';
import { useEffect, useRef } from "react";
import { Types } from "./data";

const colors = [
  ["#9D4452", "#E6A6B0", "#BE6B78", "#812836", "#5B0D1A"],
  ["#A76C48", "#F4CAAF", "#C99372", "#884E2A", "#602E0E"],
  ["#2E6B5E", "#719D93", "#498175", "#1B584A", "#093E32"],
  ["#538E3D", "#A6D096", "#75AC61", "#3A7424", "#1F520C"],
];

const color = scaleOrdinal(colors.flatMap(c=> c[1]));
interface ICircleProps {
  node: Types.Node;
}

const groupName: Function = (item: Types.Node) => {
  if (item.parent && item.depth > 1) {
    return groupName(item.parent);
  }
  return item.data.name;
};

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
      // r={node.radiusSize}
      // fill={node.fillColor}
      r={node.depth === 0 ? 2 : node.depth === 1 ? 30 : 10}
      fill={
        node.depth && node.depth >= 1 ? color(groupName(node)) : "gray"
      }
    >
      <title>{node.data.name}</title>
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
