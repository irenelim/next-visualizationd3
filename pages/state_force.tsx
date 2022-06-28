import Head from "next/head";
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceX,
  forceY,
  Simulation,
} from "d3-force";
import { select, selectAll } from "d3-selection";
import { hierarchy, HierarchyLink, HierarchyNode } from 'd3-hierarchy';

import useWindowSize from "../hooks/useWindowSize";
import { useCallback, useEffect, useRef, useState } from "react";
import { data, initialData, Types } from "../components/Force/data";
import Circles from "../components/Force/Circles";
import Links from "../components/Force/Links";
import Labels from '../components/Force/Labels';
import Home from "../components/Home";

/**
 * https://vizhub.com/curran/f192e44054aa4731b5ceba1b833028d6?edit=files&file=index.js
 * https://medium.com/analytics-vidhya/easily-show-relationships-draw-simple-force-graph-with-react-d3-utilizing-typescript-d7e9d5326b6
 * */


// const MAIN_NODE_SIZE = 40;
// const CHILD_NODE_SIZE = 15;
// const LEAF_NODE_SIZE = 5;
// const DEFAULT_DISTANCE = 20;
// const MAIN_NODE_DISTANCE = 90;
// const LEAF_NODE_DISTANCE = 30;
const MANY_BODY_STRENGTH = -250;

// Generated with https://paletton.com/#uid=75x0u0kigkU8ZuBdTpdmbh6rjc7
// const colors = [
//   ["#9D4452", "#E6A6B0", "#BE6B78", "#812836", "#5B0D1A"],
//   ["#A76C48", "#F4CAAF", "#C99372", "#884E2A", "#602E0E"],
//   ["#2E6B5E", "#719D93", "#498175", "#1B584A", "#093E32"],
//   ["#538E3D", "#A6D096", "#75AC61", "#3A7424", "#1F520C"],
// ];

function stateForce() {
  // const { nodes, links } = data;
  const root = hierarchy(initialData);
  const nodes = root.descendants() as unknown as Types.Node[];
  const links = root.links() as unknown as Types.Link[];

  const { width, height } = useWindowSize();
  // const ref = useRef<SVGSVGElement>(null);
  const [simulation, setSimulation] = useState<
  Simulation<Types.Node, Types.Link> | undefined
  >();

  const simulatePositions = useCallback(() => {
    const simu = forceSimulation(nodes)
      .force("center", forceCenter(width, height))
      // .force("center", forceCenter(width / 2, height / 2))
      .force("charge", forceManyBody().strength(MANY_BODY_STRENGTH))
      .force(
        "link",
        forceLink(links)
          // .id((d) => (d as Types.Node).id)
          .id((d) => (d as Types.Node).data.name)
          .distance((link) => 30)
          // .strength(0.5)
      )
      // .force("x", forceX())
      // .force("y", forceY());
    setSimulation(simu);
  }, [nodes, width, height]);

  const drawTicks = useCallback(() => {
    const circles = selectAll(".node");
    const lines = selectAll(".link");
    const labels = selectAll(".label");

    function onTickHandler() {
      circles
        .attr("cx", (node) => (node as Types.point).x)
        .attr("cy", (node) => (node as Types.point).y);

      lines
        .attr("x1", (link) => (link as { source: Types.point }).source.x)
        .attr("y1", (link) => (link as { source: Types.point }).source.y)
        .attr("x2", (link) => (link as { target: Types.point }).target.x)
        .attr("y2", (link) => (link as { target: Types.point }).target.y);
    
      labels
        .attr('x', (d) => {
          return (d as Types.point).x + 5
        })
        .attr('y', (d) => {
          return (d as Types.point).y + 5
        })
      }

    if (simulation) simulation.on('tick', onTickHandler)
    
  }, [simulation]);

  useEffect(() => {
    simulatePositions();
  }, []);
  
  if (simulation){
    drawTicks(); 
  }

  const restartDrag = () => {
    if (simulation) simulation.alphaTarget(0.2).restart();
  }

  const stopDrag = () => {
    if (simulation) simulation.alphaTarget(0);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Force Simulation by useState</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">Force Diagram</h1>

        <svg width={width} height={height} viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}>
          <Links links={links} />
          <Circles nodes={nodes} restartDrag={restartDrag} stopDrag={stopDrag} />
          <Labels nodes={nodes} />
        </svg>
      </main>
    </div>
  );
}

export default stateForce;
