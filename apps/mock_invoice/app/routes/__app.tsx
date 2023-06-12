import type { V2_MetaFunction } from "@remix-run/node";

import { Form, Link, NavLink, Outlet, useNavigation } from "@remix-run/react";
// import { useOptionalUser } from "~/utils";
import clsx from "clsx";
import { useSpinDelay } from "spin-delay";

import {
  FullFakebooksLogo,
  LogoutIcon,
  SpinnerIcon,
  UpRightArrowIcon,
} from "~/components/common";

export const meta: V2_MetaFunction = () => [{ title: "Mock Invoice" }];

// 🐨 add useNavigation here.
// 💯 add useSpinDelay (from 'spin-delay') here

export default function AppRoute() {
  // AS YOU CAN SEE WE WILL HAVE DELAY HERE
  const navg = useNavigation();
  const showSpinner = useSpinDelay(navg.state !== "idle", {
    delay: 200,
    minDuration: 300,
  });
  return (
    <div className="relative flex h-full rounded-lg bg-base-100 border-0 border-primary">
      <div className="border-r border-base-200 bg-base-300 w-[204px]">
        <div className="w-[204px] fixed h-[100vh] top-0 left-0 bg-base-300">
          <div className="p-4">
            <div className="flex flex-wrap items-center gap-1">
              <Link to=".">
                <FullFakebooksLogo size="sm" position="left" />
              </Link>
              {/* WHEN NAVIGATION HAPPENS SPINNER WILL BE SHOWN
              A BIT LONGER THAN IT SHOULD BECAUSE WE ARE PROLONGING
              TIME OF SPINNER BEING SHOWN */}
              <Spinner visible={showSpinner} />
            </div>
            <div className="h-7" />
            <div className="flex flex-col font-bold">
              <NavItem to="dashboard">Dashboard</NavItem>
              <NavItem to="accounts">Accounts</NavItem>
              <NavItem to="sales">Sales</NavItem>
              <NavItem to="expenses">Expenses</NavItem>
              <NavItem to="reports">Reports</NavItem>
              <a
                href="https://github.com/Rade58/my-monorepo/tree/main/apps/mock_invoice"
                className="my-1 flex gap-1 py-1 px-2 pr-16 text-[length:14px] text-secondary"
              >
                GitHub <UpRightArrowIcon />
              </a>

              <Form
                method="post"
                action="/logout"
                className="my-1 py-1 px-2 pr-16 text-[length:14px]"
              >
                <button type="submit" className="btn btn-secondary btn-xs">
                  Logout <LogoutIcon />
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      prefetch="intent"
      className={({ isActive }) =>
        `link link-primary hover:link-accent no-underline my-1 py-1 px-2 pr-16 text-[length:14px] ${
          isActive ? "border-l-2 border-primary link-info" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function Spinner({ visible }: { visible: boolean }) {
  return (
    <SpinnerIcon
      className={clsx("animate-spin transition-opacity", {
        "opacity-0": !visible,
        "opacity-100": visible,
      })}
    />
  );
}
