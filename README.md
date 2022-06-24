# Next.js + Tailwind CSS Example - DataVisualization with Nextjs TS & D3

Part 1: https://www.youtube.com/watch?v=2LhoCfjm8R4
Part 2: https://www.youtube.com/watch?v=H2qPeJx1RDI

[force, drag](https://github.com/d3/d3-drag) : https://observablehq.com/d/c55a5839a5bb7c73

covid
https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series

data will change ffrom time to time ✘: https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv

last commit on that time (data won't change ✓): https://raw.githubusercontent.com/CSSEGISandData/COVID-19/65879a43b1a6744529f3c92c435790ecd776117d/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv

## Steps

> npx create-next-app -e with-tailwindcss next-visualization
> npm install d3 @types/d3
> npm install topojson-client @types/topojson-client
> npm install react-dropdown
> npm install d3-delaunay

## Reference

https://github.com/yagajs/generic-geojson
https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures


This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-tailwindcss)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
# or
yarn create next-app --example with-tailwindcss with-tailwindcss-app
# or
pnpm create next-app --example with-tailwindcss with-tailwindcss-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
