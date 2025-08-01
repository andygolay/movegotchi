"use client";

import { WalletProvider } from "@/context/WalletProvider";
import { WalletProvider as RazorWalletProvider } from "@razorlabs/razorkit";
import { PetProvider } from "@/context/PetContext";
import { GeoTargetly } from "@/utils/GeoTargetly";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <PetProvider>
      <RazorWalletProvider autoConnect={true}>
        <WalletProvider>{children}</WalletProvider>
      </RazorWalletProvider>
      <GeoTargetly />
    </PetProvider>
  );
}
