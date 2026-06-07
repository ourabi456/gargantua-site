import "./globals.css";
import { Orbitron, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Starfield from "@/components/Starfield";
import AmbientField from "@/components/AmbientField";

const display = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Gargantua: A New Home",
  description:
    "Earth is dying. One crew burns the last of everything chasing a signal across the dark — to the world beyond the black hole. A cinematic side-scrolling odyssey.",
  keywords: ["Gargantua", "A New Home", "indie game", "sci-fi", "platformer"],
  icons: { icon: "/assets/art/logo.png" },
  openGraph: {
    title: "Gargantua: A New Home",
    description:
      "A cinematic side-scrolling odyssey to the world beyond the black hole.",
    type: "website",
    images: [
      {
        url: "/assets/art/keyart-wide-1.png",
        width: 1200,
        height: 630,
        alt: "Gargantua: A New Home — key art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gargantua: A New Home",
    description:
      "A cinematic side-scrolling odyssey to the world beyond the black hole.",
    images: ["/assets/art/keyart-wide-1.png"],
  },
};

export const viewport = {
  themeColor: "#03040a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="fx-grain fx-vignette bg-void text-[#dfe7f5] antialiased">
        {/* Persistent 3D depth field behind every section */}
        <Starfield />
        {/* Scroll-reactive atmosphere — the page evolves as you descend */}
        <AmbientField />
        {/* Atmospheric overlays */}
        <div className="fx-scanlines" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
