import * as React from "react";
import { Link, useLoaderData, useOutlet, useParams } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { CevronDownIcon } from "~/components/common";
import { getDepositListItems } from "~/models/deposit.server";
import { requireUser } from "~/session.server";
import { currencyFormatter } from "~/utils";
import clsx from "clsx";

export async function loader({ request }: LoaderArgs) {
  await requireUser(request);
  return json({
    deposits: await getDepositListItems(),
  });
}

export default function Deposits() {
  const data = useLoaderData<typeof loader>();
  const outlet = useOutlet();
  const { depositId } = useParams();
  const depositNotFound =
    depositId && data.deposits.every((d) => d.id !== depositId);
  return (
    <div className="overflow-hidden rounded-lg border border-secondary">
      {depositNotFound ? (
        <div className="p-12 text-error">
          No deposit found with the ID of {'"'}
          {depositId}
          {'"'}
        </div>
      ) : null}
      <table className="w-full">
        <thead className="border-b-2 border-secondary">
          <tr>
            <th className="border border-primary py-2 px-4"></th>
            <th className="border border-primary py-2 px-4">Date</th>
            <th className="border border-primary py-2 px-4">Invoice</th>
            <th className="border border-primary py-2 px-4">Customer</th>
            <th className="border border-primary py-2 px-4">Amount</th>
          </tr>
        </thead>
        <tbody className="max-h-[100px]">
          {data.deposits.map((d) => (
            <React.Fragment key={d.id}>
              <tr>
                <td className="border border-secondary py-2 px-4">
                  <Link
                    to={d.id === depositId ? "." : d.id}
                    className="flex justify-center"
                  >
                    <CevronDownIcon
                      className={clsx({
                        "-rotate-90": d.id === depositId,
                      })}
                    />
                  </Link>
                </td>
                <td className="border border-secondary py-2 px-4">
                  {d.depositDateFormatted}
                </td>
                <td className="border border-secondary py-2 px-4">
                  <Link
                    className="link link-info"
                    to={`../invoices/${d.invoice.id}`}
                  >
                    {d.invoice.number}
                  </Link>
                </td>
                <td className="border border-primary py-2 px-4">
                  <Link
                    className="link link-info"
                    to={`../customers/${d.invoice.customer.id}`}
                  >
                    {d.invoice.customer.name}
                  </Link>
                </td>
                <td className="border border-primary py-2 px-4">
                  {currencyFormatter.format(d.amount)}
                </td>
              </tr>
              {d.id === depositId ? (
                <tr>
                  <td colSpan={5}>{outlet}</td>
                </tr>
              ) : null}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
