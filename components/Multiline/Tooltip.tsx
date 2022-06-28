import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { CovidDeath } from "../../typings";

interface Props<T> {
  className: string;
  activeRow: T;
}

const formatDate = timeFormat("%B %d, %Y");
const formatComma = format(",");

function Tooltip<T extends CovidDeath>({ className, activeRow }: Props<T>) {
  return (
    <text className={className} x={-10} y={-10} textAnchor="end">
      <tspan x="0" dy=".6em">
        {`${activeRow.countryName}: ${formatComma(activeRow.deathTotal as number)} death${activeRow.deathTotal > 1 ? "s" : ''}`}
      </tspan>
      <tspan x="0" dy="1.2em">
        as of {formatDate(activeRow.date as Date)}
      </tspan>
    </text>
  );
}

export default Tooltip;
