import { select, selectAll } from "d3-selection";
import { useEffect, useRef } from "react";
import Circle from "./Circle";
import { Types } from "./data";
import { D3DragEvent, drag } from 'd3-drag';

interface ICirclesProps {
  nodes: Types.Node[];
  restartDrag: () => void
  stopDrag: () => void
}

function Circles({ nodes, restartDrag, stopDrag }: ICirclesProps) {

  useEffect(() => {
    const setMouseEventsListeners = () => {
      selectAll('.node')
        // @ts-ignore
        .call(drag<SVGCircleElement, Types.datum>().on('start', onDragStart).on('drag', onDrag).on('end', onDragEnd))
        // .call(drag<SVGCircleElement, Types.datum>().on('drag', onDrag))
  
      // @ts-ignore
      function onDragStart(event: D3DragEvent<SVGCircleElement>, d: Types.datum) {
        if (!event.active) {
          restartDrag()
        }
        // eslint-disable-next-line no-param-reassign
        d.fx = d.x
        // eslint-disable-next-line no-param-reassign
        d.fy = d.y
      }
  
      function onDrag(event: D3DragEvent<SVGCircleElement, never, never>, d: Types.datum) {
        // eslint-disable-next-line no-param-reassign
        d.fx = event.x
        // eslint-disable-next-line no-param-reassign
        d.fy = event.y
      }
  
      function onDragEnd(event: D3DragEvent<SVGCircleElement, never, never>, d: Types.datum) {
        if (!event.active) {
          stopDrag()
        }
        // eslint-disable-next-line no-param-reassign
        // d.fx = null // commented so that the position of the node stayed as dragged x, y
        // eslint-disable-next-line no-param-reassign
        // d.fy = null
      }
    };

    setMouseEventsListeners();
  }, [restartDrag, stopDrag]);

  return (
    <g className="nodes">
      {nodes.map((node, i) => (
          // <Circle key={node.id} node={node} />
          <Circle key={i} node={node} />
      ))}
    </g>
  );
}

export default Circles;

