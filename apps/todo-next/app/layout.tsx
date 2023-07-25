import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
const fira_code = Fira_Code({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo app',
  description: 'Todo app built with Next.js',
};

const links = [
  { href: '/docs', label: 'Docs' },
  { href: '/todos', label: 'App' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-screen h-screen`}>
        <header>
          <nav className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {links.map(({ href, label }) => {
                    return (
                      <li key={href}>
                        {/* @ts-expect-error RSC */}
                        <Link href={href}>{label}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* @ts-expect-error RSC */}
              <Link
                href="/"
                className={`${fira_code.className} btn btn-ghost normal-case text-xl`}
              >
                Todo-Next
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                {links.map(({ href, label }) => {
                  return (
                    <li key={href}>
                      {/* @ts-expect-error RSC */}
                      <Link href={href}>{label}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* <div className="navbar-end">
              <a className="btn">Button</a>
            </div> */}
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
