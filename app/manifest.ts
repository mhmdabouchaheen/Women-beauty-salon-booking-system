import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/src/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Glow",
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fff9fb",
    theme_color: "#be185d",
  };
}
