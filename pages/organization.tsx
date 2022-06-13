import Head from "next/head";
// import { csv } from 'd3-fetch'
// import { DSVRowArray } from 'd3-dsv';
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceX,
  forceY,
  Simulation,
  SimulationLinkDatum,
  SimulationNodeDatum,
} from "d3-force";
import { select, selectAll } from "d3-selection";
import { drag } from 'd3-drag';
import { hierarchy, HierarchyLink, HierarchyNode } from 'd3-hierarchy';

import useWindowSize from "../hooks/useWindowSize";
import { useCallback, useEffect, useRef, useState } from "react";
import { data, initialData, Types } from "../components/Force/data";
import Home from "../components/Home";

/**
 * https://vizhub.com/curran/f192e44054aa4731b5ceba1b833028d6?edit=files&file=index.js
 * https://medium.com/analytics-vidhya/easily-show-relationships-draw-simple-force-graph-with-react-d3-utilizing-typescript-d7e9d5326b6
 * */

// interface Props {
//     data: DSVRowArray;
//   }

const MAIN_NODE_SIZE = 40;
const CHILD_NODE_SIZE = 15;
const LEAF_NODE_SIZE = 5;
const DEFAULT_DISTANCE = 20;
const MAIN_NODE_DISTANCE = 90;
const LEAF_NODE_DISTANCE = 30;
const MANY_BODY_STRENGTH = -400;

// Generated with https://paletton.com/#uid=75x0u0kigkU8ZuBdTpdmbh6rjc7
const colors = [
  ["#9D4452", "#E6A6B0", "#BE6B78", "#812836", "#5B0D1A"],
  ["#A76C48", "#F4CAAF", "#C99372", "#884E2A", "#602E0E"],
  ["#2E6B5E", "#719D93", "#498175", "#1B584A", "#093E32"],
  ["#538E3D", "#A6D096", "#75AC61", "#3A7424", "#1F520C"],
];

// const nodes: { [key: string]: string | number }[] = [
//   { id: "Art Web", size: MAIN_NODE_SIZE },
//   { id: "Community Vision", size: CHILD_NODE_SIZE },
//   { id: "Silicon Valley Creates", size: CHILD_NODE_SIZE },
//   // { id: "Social Impact Commons", size: MAIN_NODE_SIZE },
//   // { id: "Theatre Bay Area", size: CHILD_NODE_SIZE },
//   // { id: "EastSide Arts Allianc", size: CHILD_NODE_SIZE },
//   // { id: "Local Color", size: CHILD_NODE_SIZE },
// ];

// const links: SimulationLinkDatum<{ [key: string]: string | number; }>[] = [
//   { source: 0, target: 1 }, // Art Web -> Community Vision
//   { source: 0, target: 2 }, // Art Web -> Silicon Valley Creates
//   // { source: 'Art Web', target: 'Community Vision' }, //  -> Community Vision
//   // { source: 'Art Web', target: 'Silicon Valley Creates' }, // Art Web -> Silicon Valley Creates
// ];

interface Node {
  name: string
  radiusSize?: number
  fillColor?: string
}
type Link = {
  source: string
  target: string
}

const groupColor: any = (item: { index: number, depth: number, parent: any }) => {
  if (item.parent && item.depth > 1) {
    return groupColor(item.parent);
  }
  return item.index;
};

// function organization({ data }: Props) {
function organization() {
  // const { nodes, links } = data;
  const root = hierarchy(initialData);
  const nodes = root.descendants();
  const links = root.links();

  const { width, height } = useWindowSize();
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const simulation = forceSimulation(nodes as SimulationNodeDatum[])
        // .force("center", forceCenter(width / 2, height / 2))
        .force("center", forceCenter)
        .force("charge", forceManyBody().strength(MANY_BODY_STRENGTH))
        .force(
          "link",
          forceLink(links as any[])
            // .id((d) => (d as Types.Node).id)
            .id((d) => (d as any).data.name)
            .distance((link) => 30)
        )
        .force("x", forceX())
        .force("y", forceY());

      const svg = select(ref.current);
      // centering workaround
      svg.attr("viewBox", [-width / 2, -height / 2, width, height]);

      const dragInteraction = drag<SVGCircleElement, any>()
        // .on('start', (event, node: any) => {
        //   // node.fx = event.x;
        //   // node.fy = event.y;
        //   if (!event.active && simulation) {
        //     simulation.alpha(1).restart();
        //   }
        // })
        .on('drag', (event, node: any) => {
          node.fx = event.x;
          node.fy = event.y;
          if (simulation) {
            simulation.alpha(1);
            simulation.restart();
          }
        })
        // .on('end', (event, node: any) => {          
        //   if (!event.active) {
        //     simulation.alphaTarget(0);
        //   }
        //   node.fx = null;
        //   node.fy = null;
        // });

      const lines = svg
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr(
          "stroke",
          (link) => (link as unknown as { color: string })?.color || "#bcbcbc"
        );

      const circles = svg
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("fill", (node) => {
          if (node.depth >= 1){
            return colors[groupColor(node) - 1][1];
          }
          return "gray";
        })
        .attr("r", (node) => (node.depth === 0) ? 0 : (node.depth === 1) ? 30 : 10);
        

      const text = svg
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr('font-size', 11)
        .style("pointer-events", "none")
        .text((node) => node.data.name);

      simulation.on("tick", () => {
        circles
          .attr("cx", (node) => (node as unknown as Types.point).x)
          .attr("cy", (node) => (node as unknown as Types.point).y);
        text
          .attr("x", (node) => (node as unknown as Types.point).x)
          .attr("y", (node) => (node as unknown as Types.point).y);

        lines
          .attr(
            "x1",
            (link) => (link as unknown as { source: Types.point }).source.x
          )
          .attr(
            "y1",
            (link) => (link as unknown as { source: Types.point }).source.y
          )
          .attr(
            "x2",
            (link) => (link as unknown as { target: Types.point }).target.x
          )
          .attr(
            "y2",
            (link) => (link as unknown as { target: Types.point }).target.y
          );
      });

      circles.call(dragInteraction);
    }

  }, [ref, nodes, links, width, height]);

  // const simulatePositions = useCallback(() => {
  //   const simu = forceSimulation(nodes as SimulationNodeDatum[])
  //     .force("center", forceCenter(width / 2, height / 2))
  //     .force("charge", forceManyBody().strength(-400))
  //     .force(
  //       "link",
  //       forceLink(links)
  //         .id((d) => (d as Types.Node).id)
  //         .distance((link) => 30)
  //         // .strength(0.5)
  //     )
  //     .force("x", forceX())
  //     .force("y", forceY());
  //   setSimulation(simu);
  // }, [nodes, width, height]);

  // const drawTicks = useCallback(() => {
  //   const circles = selectAll(".node");
  //   const lines = selectAll(".link");
  //   const labels = selectAll(".label");

  //   function onTickHandler() {
  //     circles
  //       .attr("cx", (node) => (node as Types.point).x)
  //       .attr("cy", (node) => (node as Types.point).y);

  //     lines
  //       .attr("x1", (link) => (link as { source: Types.point }).source.x)
  //       .attr("y1", (link) => (link as { source: Types.point }).source.y)
  //       .attr("x2", (link) => (link as { target: Types.point }).target.x)
  //       .attr("y2", (link) => (link as { target: Types.point }).target.y);

  //     labels
  //       .attr('x', (d) => {
  //         return (d as Types.point).x + 5
  //       })
  //       .attr('y', (d) => {
  //         return (d as Types.point).y + 5
  //       })
  //     }

  //   if (simulation) simulation.on('tick', onTickHandler)

  // }, [simulation]);

  // useEffect(() => {
  //   simulatePositions();
  // }, [nodes, links, width, height]);

  // if (simulation) drawTicks();

  // const restartDrag = () => {
  //   if (simulation) simulation.alphaTarget(0.2).restart();
  // }

  // const stopDrag = () => {
  //   if (simulation) simulation.alphaTarget(0);
  // }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Force Simulation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">Organization Diagram</h1>
        <p>* drag interaction issue</p>

        <svg ref={ref} width={width} height={height} />
        {/* <svg width={width} height={height}>
          <Links links={links} />
          <Circles nodes={nodes} restartDrag={restartDrag} stopDrag={stopDrag} />
          <Labels nodes={nodes} />
        </svg> */}
      </main>
    </div>
  );
}

export default organization;
