import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import FollowPoint from "../components/FollowPoint";
import SimpleSvg from "../components/SimpleSvg";
import useWindowSize from "../hooks/useWindowSize";

const Home: NextPage = () => {
  const { width, height } = useWindowSize();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {/* <FollowPoint width={width} height={height}/> */}
        <SimpleSvg width={width} height={height}/>
        
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <span className="text-blue-600">
            DataViz
          </span>
        </h1>

        <ul className="grid grid-cols-3 grid-rows-3 gap-4 my-6">
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/colors">
              <a>colors</a>
            </Link>
          </li>
          <li>
            <Link href="/population_bar">
              <a>Population Bar</a>
            </Link>
          </li>
          <li>
            <Link href="/plot">
              <a>Scatter Plot</a>
            </Link>
          </li>
          <li>
            <Link href="/temperature_line">
              <a>Temperature Lines</a>
            </Link>
          </li>
          <li>
            <Link href="/worldmap">
              <a>World Map</a>
            </Link>
          </li>
          <li>
            <Link href="/plot_menu">
              <a>Plots with Selects</a>
            </Link>
          </li>
          <li>
            <Link href="/multiple">
              <a>Multiple Views</a>
            </Link>
          </li>
          <li>
            <Link href="/plot_log">
              <a>Plot ScaleLog</a>
            </Link>
          </li>
          <li>
            <Link href="/choropleth_map">
              <a>Choropleth Map</a>
            </Link>
          </li>
          <li>
            <Link href="/covid_line">
              <a>Covid Line</a>
            </Link>
          </li>
          <li>
            <Link href="/covid_log">
              <a>Covid Log</a>
            </Link>
          </li>
          <li>
            <Link href="/covid_multiline">
              <a>Covid MultiLines</a>
            </Link>
          </li>
          <li>
            <Link href="/state_force">
              <a>Force - useState</a>
            </Link>
          </li>
          <li>
            <Link href="/organization">
              <a>Organization Force Diagram - useRef</a>
            </Link>
          </li>
          
        </ul>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by D3 and{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
