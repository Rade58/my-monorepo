import { useCart } from "~/stores/cartStore";

export default function CartModal() {
  const { cart, totalPrice, totalItems } = useCart();

  console.log({ cart, totalPrice, totalItems });

  return (
    <>
      {/* Open the modal using ID.showModal() method */}

      {/* <button className="btn" onClick={() => window.my_modal_1.showModal()}>
        open modal
      </button> */}
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
        {/*  <div className="bg-white w-80 md:w-96 p-4 rounded shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="py-2">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain mr-4"
                    />
                    <div>
                      <p className="text-gray-800 font-medium">{item.name}</p>
                      <p className="text-gray-500">
                        {item.quantity} x ${item.price}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </dialog>
    </>
  );
}
