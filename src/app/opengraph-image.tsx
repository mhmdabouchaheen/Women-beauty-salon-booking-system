import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/src/config/site";

export const alt = "Glow Beauty Salon in Beirut";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #fff1f5 0%, #fce7f3 45%, #be185d 100%)",
          color: "#4a1028",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div style={{ color: "#be185d", fontSize: 32, letterSpacing: 8, textTransform: "uppercase" }}>
          Beirut, Lebanon
        </div>
        <div style={{ fontSize: 86, fontWeight: 700, marginTop: 28 }}>{SITE_NAME}</div>
        <div style={{ color: "#6b2943", fontSize: 38, marginTop: 24 }}>
          Professional beauty treatments, made easy to book
        </div>
      </div>
    ),
    size,
  );
}
