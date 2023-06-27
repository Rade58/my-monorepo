export default function PaymentCancelled() {
  return (
    <div className="h-[86vh] flex justify-center items-center">
      <div className="p-6 md:mx-auto">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 text-error"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="text-center">
          <h3 className="md:text-2xl text-base font-semibold text-center">
            Payment Cancelled!
          </h3>
          <p className="my-2">You won{"'"}t get charged.</p>
          <p> Have a great day! </p>
          {/* <div className="py-10 text-center">
            <Link to="/" className="btn btn-primary">
              GO BACK
            </Link>
              </div>
        */}
        </div>
      </div>
    </div>
  );
}
