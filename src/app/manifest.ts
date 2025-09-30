import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Weather App By Vick",
    short_name: "V.Weather",
    description: "Weather App Challenge from Frontend Mentor",
    start_url: "/",
    display: "standalone",
    background_color: "hsl(243, 96%, 9%)",
    theme_color: "hsl(0, 0%, 100%)",
    icons: [
      {
        src: "/weather-app-main/icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "//weather-app-main/icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
