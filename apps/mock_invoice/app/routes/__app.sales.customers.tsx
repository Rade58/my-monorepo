import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useSpinDelay } from "spin-delay";
import { FilePlusIcon } from "~/components/common";
import { requireUser } from "~/session.server";
import { getCustomerListItems } from "~/models/customer.server";

type LoadingCustomer = Awaited<ReturnType<typeof getCustomerListItems>>[number];

export async function loader({ request }: LoaderArgs) {
  await requireUser(request);
  return json({
    customers: await getCustomerListItems(),
  });
}

export default function Customers() {
  const { customers } = useLoaderData<typeof loader>();
  const transition = useNavigation();

  let loadingCustomer: LoadingCustomer | undefined;
  console.log(JSON.stringify({ transition }));
  if (transition.location?.state) {
    loadingCustomer = (transition.location?.state as any)?.customer;
  }

  const showSkeleton = useSpinDelay(Boolean(loadingCustomer), {
    delay: 200,
    minDuration: 300,
  });

  return (
    <div className="flex overflow-hidden rounded-lg border-2 border-secondary">
      <div className="w-1/2 border-r border-primary">
        <NavLink
          to="new"
          prefetch="intent"
          className={({ isActive }) =>
            "block border-b-4 border-secondary py-3 px-4 hover:bg-accent" +
            " " +
            (isActive ? "bg-info" : "")
          }
        >
          <span className="flex gap-1">
            <FilePlusIcon /> <span>Create new customer</span>
          </span>
        </NavLink>
        <div className="max-h-96 overflow-y-scroll">
          {customers.map((customer) => (
            <NavLink
              key={customer.id}
              to={customer.id}
              state={{ customer }}
              prefetch="intent"
              className={({ isActive }) =>
                "block border-b border-secondary py-3 px-4 hover:bg-base-300" +
                " " +
                (isActive ? "bg-base-300" : "")
              }
            >
              <div className="flex justify-between text-[length:14px] font-bold leading-6">
                <div>{customer.name}</div>
              </div>
              <div className="flex justify-between text-[length:12px] font-medium leading-4 text-secondary-focus">
                <div>{customer.email}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex w-1/2 flex-col justify-between">
        {loadingCustomer && showSkeleton ? (
          <CustomerSkeleton
            name={loadingCustomer.name}
            email={loadingCustomer.email}
          />
        ) : (
          <Outlet />
        )}
        <small className="p-2 text-center">
          Note: this is arbitrarily slow to demonstrate pending UI.
        </small>
      </div>
    </div>
  );
}

function CustomerSkeleton({ name, email }: { name: string; email: string }) {
  return (
    <div className="relative p-10">
      <div className="text-[length:14px] font-bold leading-6">{email}</div>
      <div className="text-[length:32px] font-bold leading-[40px]">{name}</div>
      <div className="h-4" />
      <div className="text-m-h3 font-bold leading-8">Invoices</div>
      <div className="h-4" />
      <div>
        <div className="flex h-[56px] items-center border-t border-gray-400">
          <div className="h-[14px] w-full animate-pulse rounded bg-gray-400">
            &nbsp;
          </div>
        </div>
        <div className="flex h-[56px] items-center border-t border-gray-400">
          <div className="h-[14px] w-full animate-pulse rounded bg-gray-400">
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
}
