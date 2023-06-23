// import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import themes from "../themes/list";
import NavBar from "./components/Navbar";
import type { ReactNode } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
/* export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]; */

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}

export default function App() {
  return (
    <html lang="en" data-theme={themes[1]} className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RootLayout>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </RootLayout>
      </body>
    </html>
  );
}
