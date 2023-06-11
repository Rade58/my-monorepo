import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useLocation,
  useParams,
  useRouteError,
} from "@remix-run/react";
import {
  inputClasses,
  LabelText,
  submitButtonClasses,
} from "~/components/common";
import { getInvoiceDetails } from "~/models/invoice.server";
import { requireUser } from "~/session.server";
import { currencyFormatter, parseDate } from "~/utils";
import { createDeposit } from "~/models/deposit.server";
import invariant from "tiny-invariant";
import { useRef } from "react";

export async function loader({ request, params }: LoaderArgs) {
  await requireUser(request);
  const { invoiceId } = params;
  if (typeof invoiceId !== "string") {
    throw new Error("This should be impossible.");
  }
  const invoiceDetails = await getInvoiceDetails(invoiceId);
  if (!invoiceDetails) {
    throw new Response("not found", { status: 404 });
  }
  return json({
    customerName: invoiceDetails.invoice.customer.name,
    customerId: invoiceDetails.invoice.customer.id,
    totalAmount: invoiceDetails.totalAmount,
    dueStatus: invoiceDetails.dueStatus,
    dueDisplay: invoiceDetails.dueStatusDisplay,
    invoiceDateDisplay: invoiceDetails.invoice.invoiceDate.toLocaleDateString(),
    lineItems: invoiceDetails.invoice.lineItems.map((li) => ({
      id: li.id,
      description: li.description,
      quantity: li.quantity,
      unitPrice: li.unitPrice,
    })),
    deposits: invoiceDetails.invoice.deposits.map((deposit) => ({
      id: deposit.id,
      amount: deposit.amount,
      depositDateFormatted: deposit.depositDate.toLocaleDateString(),
    })),
  });
}

function validateAmount(amount: number) {
  if (amount <= 0) return "Must be greater than 0";
  if (Number(amount.toFixed(2)) !== amount) {
    return "Must only have two decimal places";
  }
  return null;
}

function validateDepositDate(date: Date) {
  if (Number.isNaN(date.getTime())) {
    return "Please enter a valid date";
  }
  return null;
}

export async function action({ request, params }: ActionArgs) {
  await requireUser(request);
  const { invoiceId } = params;
  if (typeof invoiceId !== "string") {
    throw new Error("This should be impossible.");
  }
  const formData = await request.formData();
  const intent = formData.get("intent");
  invariant(typeof intent === "string", "intent required");
  switch (intent) {
    case "create-deposit": {
      const amount = Number(formData.get("amount"));
      const depositDateString = formData.get("depositDate");
      const note = formData.get("note");
      invariant(!Number.isNaN(amount), "amount must be a number");
      invariant(typeof depositDateString === "string", "dueDate is required");
      invariant(typeof note === "string", "dueDate is required");
      const depositDate = parseDate(depositDateString);

      const errors = {
        amount: validateAmount(amount),
        depositDate: validateDepositDate(depositDate),
      };
      const hasErrors = Object.values(errors).some(
        (errorMessage) => errorMessage
      );
      if (hasErrors) {
        return json({ errors });
      }

      await createDeposit({ invoiceId, amount, note, depositDate });
      return new Response("ok");
    }
    default: {
      throw new Error(`Unsupported intent: ${intent}`);
    }
  }
}

const lineItemClassName =
  "flex justify-between border-t border-info py-4 text-[14px] leading-[24px]";
export default function InvoiceRoute() {
  const data = useLoaderData<typeof loader>();
  const location = useLocation();
  return (
    <div className="relative p-10" key={location.key}>
      <Link
        to={`../../customers/${data.customerId}`}
        className="text-[length:14px] font-bold leading-6 text-primary no-underline text-lg"
      >
        {data.customerName}
      </Link>
      <div className="text-[length:32px] font-bold leading-[40px]">
        {currencyFormatter.format(data.totalAmount)}
      </div>
      <LabelText>
        <span
          className={
            data.dueStatus === "paid"
              ? "text-primary"
              : data.dueStatus === "overdue"
              ? "text-secondary"
              : ""
          }
        >
          {data.dueDisplay}
        </span>
        {` • Invoiced ${data.invoiceDateDisplay}`}
      </LabelText>
      <div className="h-4" />
      {data.lineItems.map((item) => (
        <LineItemDisplay
          key={item.id}
          description={item.description}
          unitPrice={item.unitPrice}
          quantity={item.quantity}
        />
      ))}
      <div className={`${lineItemClassName} font-bold`}>
        <div>Net Total</div>
        <div>{currencyFormatter.format(data.totalAmount)}</div>
      </div>
      <div className="h-8" />
      <Deposits />
    </div>
  );
}

function Deposits() {
  const data = useLoaderData<typeof loader>();

  // - FOR NON-NAV MUTATION EXERCISE
  // 🐨 call useFetcher here to get the fetcher for the form
  const neuDepositFetcher = useFetcher();

  // - FOR OPTIMISTIC-UI EXERCISE
  // 🐨 create a ref for the form (so we can reset it once the submission is finished)
  // 🐨 create a deposits array that includes the user's submission
  // 💰 you can get the user's submission via newDepositFetcher.submission
  // 💰 you can convert the depositDate to a Date object via parseDate and then use toLocaleDateString()
  // 🐨 add a useEffect that resets the form when the submission is finished
  // 💰 (newDepositFetcher.state === "idle")
  const formRef = useRef<HTMLFormElement>(null);
  const deposits: typeof data.deposits = [...data.deposits];

  if (neuDepositFetcher.submission) {
    deposits.push({
      id: "neu",
      amount: neuDepositFetcher.submission.formData.get("amount"),
      depositDateFormatted: parseDate(
        neuDepositFetcher.submission.formData.get("depositDate")
      ).toLocaleDateString(),
    });
  }

  return (
    <div>
      <div className="font-bold leading-8">Deposits</div>
      {/* {data.deposits.length > 0 ? ( */}
      {deposits.length > 0 ? (
        // data.deposits.map((deposit) => (
        deposits.map((deposit) => (
          <div key={deposit.id} className={lineItemClassName}>
            <Link
              to={`../../deposits/${deposit.id}`}
              className="text-info underline"
            >
              {deposit.depositDateFormatted}
            </Link>
            <div>{currencyFormatter.format(deposit.amount)}</div>
          </div>
        ))
      ) : (
        <div>None yet</div>
      )}
      {/* 🐨 change Form to your neuDepositFetcher.Form */}
      <neuDepositFetcher.Form
        ref={formRef}
        method="post"
        className="grid grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-2"
      >
        <div className="min-w-[100px]">
          <div className="flex flex-wrap items-center gap-1">
            <LabelText>
              <label htmlFor="depositAmount">Amount</label>
            </LabelText>
          </div>
          <input
            id="depositAmount"
            name="amount"
            type="number"
            className={inputClasses}
            min="0.01"
            step="any"
            required
          />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-1">
            <LabelText>
              <label htmlFor="depositDate">Date</label>
            </LabelText>
          </div>
          <input
            id="depositDate"
            name="depositDate"
            type="date"
            className={`${inputClasses} h-[34px]`}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:col-span-2 lg:flex">
          <div className="flex-1">
            <LabelText>
              <label htmlFor="depositNote">Note</label>
            </LabelText>
            <input
              id="depositNote"
              name="note"
              type="text"
              className={inputClasses}
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className={submitButtonClasses}
              name="intent"
              value="create-deposit"
            >
              Create
            </button>
          </div>
        </div>
      </neuDepositFetcher.Form>
    </div>
  );
}

function LineItemDisplay({
  description,
  quantity,
  unitPrice,
}: {
  description: string;
  quantity: number;
  unitPrice: number;
}) {
  return (
    <div className={lineItemClassName}>
      <div>{description}</div>
      {quantity === 1 ? null : <div className="text-[10px]">({quantity}x)</div>}
      <div>{currencyFormatter.format(unitPrice)}</div>
    </div>
  );
}

export function ErrorBoundary() {
  const params = useParams();

  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  /* if (caught.status === 404) {
    return (
      <div className="p-12 text-red-500">
        No invoice found with the ID of "{params.invoiceId}"
      </div>
    );
  } */

  if (error.status === 404) {
    return (
      <div className="p-12 text-error-content">
        No invoice found with the ID of {'"'}
        {params.invoiceId}
        {'"'}
      </div>
    );
  }

  // return <div>An unexpected error occurred: {error.statusText}</div>;

  return (
    <div className="absolute inset-0 flex justify-center bg-error pt-4">
      <div className="text-red-brand text-center">
        <div className="text-[14px] font-bold text-error-content">Oh snap!</div>
        <div className="px-2 text-[12px] text-error-content">
          There was a problem. Sorry.
        </div>
      </div>
    </div>
  );
}
