import type { Metadata } from "next";
import localFont from "next/font/local";
import ClientProviders from "./ClientProviders";

import "nes.css/css/nes.min.css";
import "@razorlabs/razorkit/style.css";
import "./globals.css";

const tondu = localFont({
  src: "./../../public/Tondu-Beta.ttf",
  variable: "--font-tondu",
});

export const metadata: Metadata = {
  title: "Movegucci",
  description: "Movegucci - Your new favorite on-chain pet!",
  openGraph: {
    title: "Movegucci",
    description: "Movegucci - Your new favorite on-chain pet!",
    images: ["/Movegucci.png"],
  },
  twitter: {
    card: "summary",
    site: "@Aptos_Network",
    title: "Movegucci",
    description: "Narwhal Moverz - Your new favorite on-chain pet!",
    images: ["/aptogotchi.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Rnm3DL87HNmPncIFwBLXPhy-WGFDXIyplSL4fRtnFsA"
        />
      </head>
      <body className={tondu.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
