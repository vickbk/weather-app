import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vick' Weather App",
    short_name: "V.Weather",
    start_url: "/",
    icons: [
      {
        src: "/weather-app-main/icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/weather-app-main/icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "hsl(0, 0%, 100%)",
    background_color: "hsl(243, 96%, 9%)",
    display: "standalone",
    related_applications: [
      {
        platform: "webapp",
        url: "https://weather-app-henna-one-47.vercel.app/manifest.json",
      },
    ],
  };
}
