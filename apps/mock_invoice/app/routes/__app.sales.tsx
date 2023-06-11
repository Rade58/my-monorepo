import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useMatches } from "@remix-run/react";
import { getFirstCustomer } from "~/models/customer.server";
import { getFirstInvoice } from "~/models/invoice.server";
import { requireUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  await requireUser(request);
  const [firstInvoice, firstCustomer] = await Promise.all([
    getFirstInvoice(),
    getFirstCustomer(),
  ]);

  // console.log({ firstCustomer, firstInvoice });

  return json({
    firstInvoiceId: firstInvoice?.id,
    firstCustomerId: firstCustomer?.id,
  });
}

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? "font-bold text-info" : "";

export default function SalesRoute() {
  const data = useLoaderData<typeof loader>();
  const matches = useMatches();
  // const indexMatches = matches.some((m) => m.id === "routes/__app/sales/index");

  // console.log(JSON.stringify({ matches }, null, 2));

  const invoiceMatches = matches.some(
    (m) => m.id === "routes/__app.sales.invoices"
  );
  const customerMatches = matches.some(
    (m) => m.id === "routes/__app.sales.customers"
  );
  const overviewMatches =
    matches[matches.length - 1].id === "routes/__app.sales._index";
  const subscriptionMatches = matches.some(
    (m) => m.id === "routes/__app.sales.subscriptions"
  );
  const depositsMatches = matches.some(
    (m) => m.id === "routes/__app.sales.deposits"
  );

  /* console.log({
    invoiceMatches,
    customerMatches,
    overviewMatches,
    subscriptionMatches,
    depositsMatches,
  }); */

  return (
    <div className="relative h-full p-10">
      <h1 className="font-display text-3xl text-primary">Sales</h1>
      <div className="h-6" />
      <div className="flex gap-4 border-b border-base-content pb-4 text-[length:14px] font-medium text-gray-400">
        <NavLink
          to="."
          className={`link link-secondary no-underline ${linkClassName({
            isActive: overviewMatches,
          })}`}
        >
          Overview
        </NavLink>
        <NavLink
          prefetch="intent"
          to="subscriptions"
          className={`link link-secondary no-underline ${linkClassName({
            isActive: subscriptionMatches,
          })}`}
        >
          Subscriptions
        </NavLink>
        <NavLink
          prefetch="intent"
          to={
            data.firstInvoiceId ? `invoices/${data.firstInvoiceId}` : "invoices"
          }
          className={`link link-secondary no-underline ${linkClassName({
            isActive: invoiceMatches,
          })}`}
        >
          Invoices
        </NavLink>
        <NavLink
          prefetch="intent"
          to={
            data.firstCustomerId
              ? `customers/${data.firstCustomerId}`
              : "Customers"
          }
          className={`link link-secondary no-underline ${linkClassName({
            isActive: customerMatches,
          })}`}
        >
          Customers
        </NavLink>
        <NavLink
          prefetch="intent"
          to="deposits"
          className={`link link-secondary no-underline ${linkClassName({
            isActive: depositsMatches,
          })}`}
        >
          Deposits
        </NavLink>
      </div>
      <div className="h-4" />
      <Outlet />
    </div>
  );
}
