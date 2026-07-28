import StripePaymentCancelled from "@/src/components/customer/StripePaymentCancelled";

export default async function StripeCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ reservation_id?: string }>;
}) {
  const { reservation_id: reservationId = "" } = await searchParams;
  return <StripePaymentCancelled reservationId={reservationId} />;
}
