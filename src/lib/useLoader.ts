import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

// eslint-disable-next-line no-restricted-syntax
export const useLoader = <Fn extends (args: LoaderFunctionArgs) => Promise<unknown>>() => useLoaderData() as Awaited<ReturnType<Fn>>
