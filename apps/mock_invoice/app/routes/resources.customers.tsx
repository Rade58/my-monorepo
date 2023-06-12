import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { useCombobox } from "downshift";
import { useId, useState } from "react";
import invariant from "tiny-invariant";
import { LabelText } from "~/components/common";
import { searchCustomers } from "~/models/customer.server";
import { requireUser } from "~/session.server";

type CustomerSearchResult = {
  customers: Awaited<ReturnType<typeof searchCustomers>>;
};

// WE DO NOT HAVE DEFAULT EXPORT
// SO THIS MEANS THAT THIS 'PAGE' WILL ONLY HAVE
// A loader , ONLY A BECKEND (IT ACTS LIKE API ENDPOINT)

export async function loader({ request }: LoaderArgs) {
  await requireUser(request);
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  invariant(typeof query === "string", "query is required");
  return json<CustomerSearchResult>({
    customers: await searchCustomers(query),
  });
}

type Customer = CustomerSearchResult["customers"][number];

// AS YOU CAN SEE THIS IS NOT DEFAULT EXPORT
// THIS COMMONLY IS NOT A GOOD PRACTICE
// BUT IN THIS CASE IT WILL DO THE JOB
// WE ARE IMPORTING AND RENDERING CustomerCombobox COMPONENT
// IN THIS PAGE
// /routes/__app.sales.invoices.new.tsx
//

export function CustomerCombobox({ error }: { error?: string | null }) {
  const customerFetcher = useFetcher();
  const id = useId();
  const customers =
    (customerFetcher.data as CustomerSearchResult | null)?.customers ?? [];
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | null | undefined
  >(null);

  const cb = useCombobox<Customer>({
    id,
    onSelectedItemChange: ({ selectedItem }) => {
      setSelectedCustomer(selectedItem);
    },
    items: customers,
    itemToString: (item) => (item ? item.name : ""),
    onInputValueChange: (changes) => {
      if (!changes.inputValue) return;

      customerFetcher.submit(
        { query: changes.inputValue },
        { method: "get", action: "/resources/customers" }
      );
    },
  });

  const displayMenu = cb.isOpen && customers.length > 0;

  return (
    <div className="relative">
      <input
        name="customerId"
        type="hidden"
        value={selectedCustomer?.id ?? ""}
        className="input input-primary"
      />
      <div className="flex flex-wrap items-center gap-1">
        <label {...cb.getLabelProps()}>
          <LabelText>Customer</LabelText>
        </label>
        {error ? (
          <em id="customer-error" className="text-d-p-xs text-red-600">
            {error}
          </em>
        ) : null}
      </div>
      {/* <div {...cb.getComboboxProps()}> */}
      <input
        {...cb.getInputProps({
          className: clsx("input input-primary", {
            "rounded-t rounded-b-0": displayMenu,
            rounded: !displayMenu,
          }),
          "aria-invalid": Boolean(error) || undefined,
          "aria-errormessage": error ? "customer-error" : undefined,
        })}
      />
      {/* </div> */}
      <ul
        {...cb.getMenuProps({
          className: clsx(
            "absolute z-10 bg-white shadow-lg rounded-b w-full border border-t-0 border-gray-500 max-h-[180px] overflow-scroll",
            { hidden: !displayMenu }
          ),
        })}
      >
        {cb.isOpen
          ? customers.map((customer, index) => (
              <li
                className={clsx("cursor-pointer py-1 px-2", {
                  "bg-green-200": cb.highlightedIndex === index,
                })}
                key={customer.id}
                {...cb.getItemProps({ item: customer, index })}
              >
                {customer.name} ({customer.email})
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
