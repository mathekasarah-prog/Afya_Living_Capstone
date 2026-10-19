
import { useParams, Link } from 'react-router-dom';

function OrderConfirmation() {
  const { orderId } = useParams();

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#fafbf8] px-4 py-12 sm:px-6">
      <section className="w-full max-w-xl rounded-3xl border border-[#e3e5dc] bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-14">

        {/* Success icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e8efe5]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-10 w-10 text-[#244d38]"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5 12 4 4L19 6"
            />
          </svg>
        </div>

        {/* Confirmation message */}
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#708c63]">
          Thank you for choosing Afya Living
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#102a22] sm:text-4xl">
          Order confirmed!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
          Thank you for your order. We're delighted to be part of your
          self-care journey.
        </p>

        {/* Order reference */}
        <div className="mt-8 rounded-2xl border border-dashed border-[#cbd4c4] bg-[#f7f4ec] px-4 py-5">
          <p className="text-sm text-gray-600">
            Your order reference
          </p>

          <p className="mt-2 break-all text-2xl font-bold tracking-wide text-[#102a22]">
            #{orderId}
          </p>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            Keep this reference for your order enquiries.
          </p>
        </div>

        {/* Next steps */}
        <div className="mt-6 rounded-xl bg-[#f7faf5] p-4 text-left">
          <p className="font-semibold text-[#102a22]">
            What's next?
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Please keep your order reference handy. Contact our team if you
            need help with your order.
          </p>
        </div>

        {/* Return to shopping */}
        <Link
          to="/"
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#102a22] px-6 py-3 font-semibold text-white transition hover:bg-[#244d38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102a22] sm:w-auto"
        >
          <span aria-hidden="true" className="mr-2">←</span>
          Continue Shopping
        </Link>

      </section>
    </main>
  );
}

export default OrderConfirmation;
