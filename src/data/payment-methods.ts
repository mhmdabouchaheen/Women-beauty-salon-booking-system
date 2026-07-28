// TODO(backend): stand-in for a real "payment methods" fetch/store once a
// backend + payment processor (e.g. Stripe) exists again.

export interface PaymentMethod {
  id: string;
  brand: "Visa" | "Mastercard" | "Amex";
  last4: string;
  expiry: string; // MM/YY
  isDefault?: boolean;
}

export const mockPaymentMethods: PaymentMethod[] = [
  { id: "pm_1", brand: "Visa", last4: "4242", expiry: "08/28", isDefault: true },
  { id: "pm_2", brand: "Mastercard", last4: "8891", expiry: "02/27" },
];
