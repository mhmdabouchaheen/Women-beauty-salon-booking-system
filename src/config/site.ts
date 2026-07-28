const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = (configuredUrl || "http://localhost:3000").replace(/\/+$/, "");
export const SITE_NAME = "Glow Beauty Salon";
export const SITE_DESCRIPTION =
  "Book professional hair, nail, facial, and beauty appointments with Glow Beauty Salon in Beirut, Lebanon.";
