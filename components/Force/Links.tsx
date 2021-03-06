import { Types } from "./data";
import Link from "./Link";

interface ILinksProps {
  links: Types.Link[];
}

function Links({ links }: ILinksProps) {
  return (
    <g className="links">
      {links.map((link, i) => (
          <Link key={i} link={link} />
      ))}
    </g>
  );
}

export default Links;
