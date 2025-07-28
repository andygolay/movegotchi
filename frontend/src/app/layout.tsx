<<<<<<< HEAD
import { WalletProvider } from "@/context/WalletProvider";
=======
"use client";
import { WalletProvider } from "@/context/WalletProvider";
import { WalletProvider as RazorWalletProvider } from "@razorlabs/razorkit";
>>>>>>> 649fa07 (Integrated RazorKit wallet adapter with Nightly support)
import type { Metadata } from "next";
import localFont from "next/font/local";
import { PropsWithChildren } from "react";
import { GeoTargetly } from "@/utils/GeoTargetly";
import "nes.css/css/nes.min.css";
import { Toaster } from "sonner";
import { PetProvider } from "@/context/PetContext";
<<<<<<< HEAD
=======
import "@razorlabs/razorkit/style.css";
>>>>>>> 649fa07 (Integrated RazorKit wallet adapter with Nightly support)
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

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Rnm3DL87HNmPncIFwBLXPhy-WGFDXIyplSL4fRtnFsA"
        />
      </head>
      <body className={tondu.className}>
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: {
              letterSpacing: "0.02em",
            },
            className: "toast",
            duration: 5000,
          }}
          closeButton
          expand={true}
        />
        <PetProvider>
<<<<<<< HEAD
          <WalletProvider>{children}</WalletProvider>
=======
          <RazorWalletProvider autoConnect={true}>
            <WalletProvider>
              {children}
            </WalletProvider>
          </RazorWalletProvider>
>>>>>>> 649fa07 (Integrated RazorKit wallet adapter with Nightly support)
        </PetProvider>
        <GeoTargetly />
      </body>
    </html>
  );
}
