<<<<<<< HEAD
"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { PropsWithChildren } from "react";

const wallets = [new PetraWallet()];
=======

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PropsWithChildren } from "react";

const wallets = [
  new PetraWallet(),
  new MartianWallet(),
];
>>>>>>> 649fa07 (Integrated RazorKit wallet adapter with Nightly support)

export function WalletProvider({ children }: PropsWithChildren) {
  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      {children}
    </AptosWalletAdapterProvider>
  );
}
