import StripePaymentSuccess from "@/src/components/customer/StripePaymentSuccess";

export default async function StripeSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId = "" } = await searchParams;
  return <StripePaymentSuccess sessionId={sessionId} />;
}
