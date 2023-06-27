import { Fragment, useEffect, /* useRef, */ useState } from "react";
import { useCart } from "~/stores/cartStore";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigation, useMatches } from "@remix-run/react";

export default function CartModal() {
  // const submit = useSubmit();
  const { state } = useNavigation();

  // const match = useMatch();
  const [_, { pathname }] = useMatches();

  // const inputRef = useRef();
  const {
    cart,
    totalPrice,
    totalItems,
    showCart,
    toggleShowCart,
    removeFromCart,
    setCartFromStorage,
    clearCartStorage,
  } = useCart();
  // console.log({ cart, totalPrice, totalItems });

  // const [submiting, setSubmitStatus] = useState<boolean>(false);

  const [setted, setSetted] = useState<boolean>(false);

  useEffect(() => {
    if (setted === false) {
      if (pathname === "/payment/success") {
        console.log("cart success clear");
        clearCartStorage();
        setSetted(true);
      } else {
        console.log("cart init set");
        setCartFromStorage();
        setSetted(true);
      }
    }
  }, [setCartFromStorage, clearCartStorage, pathname, setted, setSetted]);

  /*  useEffect(() => {
    //
    //
    if (submiting) {
      const formData = new FormData();

      formData.append("cart", JSON.stringify(cart));

      clearCartStorage();
      submit(formData, {
        action: "/buy",
        method: "POST",
        encType: "multipart/form-data",
      });
    }
  }, [submiting, clearCartStorage, cart, submit]);
 */
  return (
    <Transition.Root show={showCart} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleShowCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-base-200 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-base-200 shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => toggleShowCart()}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-secondary-focus"
                          >
                            {cart.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-primary">
                                  <img
                                    src={product.image.asset.url}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium">
                                      <h3>
                                        <Link
                                          to={`/product/${product.slug.current}`}
                                        >
                                          {product.name}
                                        </Link>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    {/* <p className="mt-1 text-sm text-gray-500">
                                      {product.color}
                                    </p> */}
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="">Qty {product.quantity}</p>

                                    <div className="flex">
                                      <button
                                        onClick={() => {
                                          removeFromCart(product.id);
                                          if (totalItems <= 1) {
                                            toggleShowCart();
                                          }
                                        }}
                                        type="button"
                                        className="font-medium text-error hover:text-error-content"
                                      >
                                        {product.quantity > 1
                                          ? "Remove one"
                                          : "Remove"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-primary-focus px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-secondary">
                        <p>Subtotal</p>
                        <p>
                          {totalPrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <form className="mt-6" action="/buy" method="POST">
                        <button
                          // onClick={() => {
                          //   setSubmitStatus(true);
                          // }}
                          // type="submit"
                          className="btn btn-primary btn-block"
                          disabled={state !== "idle"}
                        >
                          Checkout
                        </button>
                        <input
                          type="hidden"
                          name="cart"
                          value={JSON.stringify(cart)}
                        />
                      </form>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-primary hover:text-secondary"
                            onClick={() => toggleShowCart()}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
