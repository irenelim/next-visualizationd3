import Head from "next/head";
import { csvParse } from 'd3-dsv';
import { CSSColors } from "../typings";
import ColorPie from "../components/ColorPie";

interface Props {
    cssColors: CSSColors[];
  }

function colors({ cssColors }: Props) {
    
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>CSS Named Colors</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">
          CSS Named Colors
        </h1>

        <ColorPie width={960} height={500} cssColors={cssColors} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
    const csvUrl = 'https://gist.githubusercontent.com/irenelim/f15f22055a3003ebd8f2a62426c3affe/raw/cssNameColors.csv';
    const response = await fetch(csvUrl);
    const cssColors = await response.text();

    return {
        props: {
            cssColors: csvParse(cssColors)
        }
    }
}

export default colors