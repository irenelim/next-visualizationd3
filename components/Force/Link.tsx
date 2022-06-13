import { select } from "d3-selection";
import { useEffect, useRef } from "react";
import { Types } from "./data";

interface ILinkProps {
  link: Types.Link;
  // restartDrag: () => void
  // stopDrag: () => void
}

function Link({ link }: ILinkProps) {
  const ref = useRef< SVGLineElement>(null);

  useEffect(() => {
    if (ref) {
      select(ref.current).data([link]);
    }
  }, [ref]);

  const onHoverIn = (event: React.MouseEvent<SVGLineElement, MouseEvent>) => {
    select('.linkGroup')
    .append('text')
    .attr('class', 'linkTextValue')
    .text((link.type as string).replace(/(.{50})..+/, '$1…'))
    .attr('x', event.nativeEvent.offsetX)
    .attr('y', event.nativeEvent.offsetY)
  };
  const onHoverOut = () => {
    select('.linkTextValue').remove()
  };

  return (
    <g className="linkGroup">
      <line
        ref={ref}
        className="link"
        stroke="#cfcccc"
        // strokeWidth={3}
        strokeOpacity={1}
        // onMouseEnter={onHoverIn}
        // onMouseOut={onHoverOut}
      >
        {/* <title>{link?.source}</title> */}
      </line>
    </g>
  );
}

export default Link;
