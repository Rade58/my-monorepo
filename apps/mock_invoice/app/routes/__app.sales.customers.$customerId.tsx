import type { LoaderArgs } from "@remix-run/node";
import { defer, json } from "@remix-run/node";
import {
  Await,
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCustomerInfo, getCustomerDetails } from "~/models/customer.server";
import { requireUser } from "~/session.server";
import { currencyFormatter } from "~/utils";

import { ErrorFallback, InvoiceDetailsFallback } from "~/components/common";
import { Suspense } from "react";

export async function loader({ request, params }: LoaderArgs) {
  await requireUser(request);
  const { customerId } = params;
  invariant(
    typeof customerId === "string",
    "params.customerId is not available"
  );

  // The customerDetails are slow, so let's defer that.
  // 🐨 Change this from a Promise.all to two separate calls
  // 🐨 Await the customer info, and not the customer details
  // (so the value of customerDetails will be a promise).
  /* 
  const [customerInfo, customerDetails] = await Promise.all([
    getCustomerInfo(customerId),
    getCustomerDetails(customerId),
  ]); */
  //
  const customerInfo = await getCustomerInfo(customerId);
  // console.log({ customerInfo });

  // ----------------------------------------------------------
  // ----------------------------------------------------------

  // 🐨 we no longer can determine at this stage whether or not there are
  // `customerDetails`, so remove that from this if statement
  /* 
  if (!customerDetails || !customerInfo) {
    throw new Response("not found", { status: 404 });
  } */
  if (!customerInfo) {
    throw new Response("not found", { status: 404 });
  }
  const customerDetailsPromise = getCustomerDetails(customerId);
  // 🐨 change this from "json" to "defer" (from @remix-run/node)
  /* return json({
    customerInfo,
    customerDetails,
  }); */

  return defer({
    customerInfo,
    customerDetails: customerDetailsPromise,
  });
}

const lineItemClassName = "border-t border-gray-100 text-[14px] h-[56px]";

export default function CustomerRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="relative p-10">
      <div className="text-[length:14px] font-bold leading-6">
        {/* @ts-expect-error */}
        {data.customerInfo.email}
      </div>
      <div className="text-[length:32px] font-bold leading-[40px]">
        {/* @ts-expect-error */}

        {data.customerInfo.name}
      </div>
      <div className="h-4" />
      <div className="text-m-h3 font-bold leading-8">Invoices</div>
      <div className="h-4" />
      {/*
        🐨 Wrap this in <Suspense><Await /></Suspense> components with:
        - Suspense "fallback" prop should be <InvoiceDetailsFallback /> (imported from "~/components")
        - Await "resolve" prop as data.customerDetails
        - Await "errorElement" prop can be the ErrorFallback component (imported from "~/components")
      */}
      <Suspense fallback={<InvoiceDetailsFallback />}>
        <Await
          resolve={data.customerDetails}
          errorElement={
            <div className="relative h-full">
              <ErrorFallback />
            </div>
          }
        >
          {(customerDetails) => (
            <table className="w-full">
              <tbody>
                {customerDetails?.invoiceDetails.map((details) => (
                  <tr key={details.id} className={lineItemClassName}>
                    <td>
                      <Link
                        className="text-blue-600 underline"
                        to={`../../invoices/${details.id}`}
                      >
                        {details.number}
                      </Link>
                    </td>
                    <td
                      className={
                        "text-center uppercase" +
                        " " +
                        (details.dueStatus === "paid"
                          ? "text-green-brand"
                          : details.dueStatus === "overdue"
                          ? "text-red-brand"
                          : "")
                      }
                    >
                      {details.dueStatusDisplay}
                    </td>
                    <td className="text-right">
                      {currencyFormatter.format(details.totalAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();
  const params = useParams();

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return (
      <div className="p-12 text-red-500">
        No customer found with the ID of {'"'}
        {params.customerId}
        {'"'}
      </div>
    );
  }

  // throw new Error(`Unexpected caught response with status: ${error.status}`);

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
