import { Link } from "@remix-run/react";
import Logo from "./Logo";
import CartMenu from "./CartMenu";

export default function NavBar() {
  return (
    <header className="navbar bg-base-100">
      <div className="navbar-start">
        {/* <div className="dropdown">
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
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div> */}
        <Link to="/" className="normal-case text-xl">
          <div className="w-16 border-0 border-primary hover:scale-110">
            <Logo />
          </div>
          {/* daisyUI */}
        </Link>
      </div>
      {/*  <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="temp">Temp</Link>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div> */}
      <div className="navbar-end flex-none">
        <CartMenu />
      </div>
    </header>
  );
}
