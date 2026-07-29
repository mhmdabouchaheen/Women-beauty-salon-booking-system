import CustomerBookingForm from "@/src/components/customer/CustomerBookingForm";

export default function CustomerBookingPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-9 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-8 text-white">
        <h1 className="text-4xl font-bold">Book an Appointment</h1>
        <p className="mt-2 text-rose-100">
          Choose your treatment and reserve a time that works for you and your expert.
        </p>
      </header>
      <CustomerBookingForm />
    </div>
  );
}
