import Head from "next/head";
// import { csv } from 'd3-fetch'
// import { DSVRowArray } from 'd3-dsv';
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  SimulationLinkDatum
} from "d3-force";
import { select } from "d3-selection";

import useWindowSize from "../hooks/useWindowSize";
import { useEffect, useRef } from "react";

/** https://vizhub.com/curran/f192e44054aa4731b5ceba1b833028d6?edit=files&file=index.js */

// interface Props {
//     data: DSVRowArray;
//   }

const nodes: { [key: string]: string | number }[] = [
  { id: "Art Web", size: 50 },
  { id: "Community Vision", size: 10 },
  { id: "Silicon Valley Creates", size: 10 },
];

const links: SimulationLinkDatum<{ [key: string]: string | number; }>[] = [
  { source: 0, target: 1 }, // Art Web -> Community Vision
  { source: 0, target: 2 }, // Art Web -> Silicon Valley Creates
];

// function organization({ data }: Props) {
function organization() {
  const { width, height } = useWindowSize();
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const simulation = forceSimulation(nodes)
        .force("charge", forceManyBody().strength(-2000))
        .force("link", forceLink(links).distance(link => 30))
        .force("center", forceCenter());

      const svg = select(ref.current);
      // centering workaround
      svg.attr("viewBox", [-width / 2, -height / 2, width, height]);

      const lines = svg.selectAll("line").data(links).enter().append("line")
      .attr('stroke', (link) => link.color || 'black');
      // .attr('stroke', 'black');

      const circles = svg
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("fill", (node) => node.color || "gray")
        .attr("r", (node) => node.size);

      const text = svg
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("pointer-events", "none")
        .text((node) => node.id);

      simulation.on("tick", () => {
        // console.log('tick');
        //   svg
        //     .selectAll(".link")
        //     .data(links)
        //     .join("line")
        //     .attr("class", "link")
        //     .attr("stroke", "black")
        //     .attr("fill", "none")
        //     .attr("x1", link => link.source.x)
        //     .attr("y1", link => link.source.y)
        //     .attr("x2", link => link.target.x)
        //     .attr("y2", link => link.target.y);

        //   // nodes
        //   svg
        //     .selectAll(".node")
        //     .data(nodes)
        //     .join("circle")
        //     .attr("class", "node")
        //     .attr("r", node => node.size)
        //     .attr("cx", node => node.x)
        //     .attr("cy", node => node.y);

        //   // labels
        //   svg
        //     .selectAll(".label")
        //     .data(nodes)
        //     .join("text")
        //     .attr("class", "label")
        //     .attr("text-anchor", "middle")
        //     .attr("font-size", 20)
        //     .text(d => d.id)
        //     .attr("x", node => node.x)
        //     .attr("y", node => node.y);

        circles.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
        text.attr("x", (node) => node.x).attr("y", (node) => node.y);

        lines
          .attr("x1", (link) => link.source.x)
          .attr("y1", (link) => link.source.y)
          .attr("x2", (link) => link.target.x)
          .attr("y2", (link) => link.target.y);
      });
    }
  }, [ref, nodes, links, width, height]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Force Simulation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">Organization Diagram</h1>

        <svg ref={ref} width={width} height={height} />
      </main>
    </div>
  );
}

// export async function getStaticProps() {
// const csvUrl = 'https://gist.githubusercontent.com/thomasnield/03cf7c08016b514086ac8a9fdc07cc65/raw/iris.csv';
// const row = (d: any) => {
//   d.sepal_length = +d.sepal_length;
//   d.sepal_width = +d.sepal_width;
//   d.petal_length = +d.petal_length;
//   d.sepal_width = +d.sepal_width;
//   return d;
// };
// const data = await csv(csvUrl, row);

// return {
//     props: {
//         data
//     }
// }
// }

export default organization;
