"use client";

import {
  useWallet,
  WalletReadyState,
  Wallet,
  isRedirectable,
  WalletName,
} from "@aptos-labs/wallet-adapter-react";
<<<<<<< HEAD
import { cn } from "@/utils/styling";
import { toast } from "sonner";

const buttonStyles = "nes-btn is-primary m-auto sm:m-0 sm:px-4";

export const WalletButtons = () => {
  const { wallets, connected, disconnect, isLoading } = useWallet();
=======

import { cn } from "@/utils/styling";
import { toast } from "sonner";
import React, { useState } from "react";

const buttonStyles = "nes-btn is-primary m-auto sm:m-0 sm:px-4";


export const WalletButtons = () => {
  const { wallets, connected, disconnect, isLoading } = useWallet();
  const [showModal, setShowModal] = useState(false);
>>>>>>> 649fa07 (Integrated RazorKit wallet adapter with Nightly support)

  const onWalletDisconnectRequest = async () => {
    try {
      disconnect();
    } catch (error) {
      console.warn(error);
      toast.error("Failed to disconnect wallet. Please try again.");
    } finally {
      toast.success("Wallet successfully disconnected!");
    }
  };

  if (connected) {
    return (
      <div className="flex flex-row m-auto sm:m-0 sm:px-4">
        <div
          className={cn(buttonStyles, "hover:bg-blue-700 btn-small")}
          onClick={onWalletDisconnectRequest}
        >
          Disconnect
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  if (isLoading || !wallets[0]) {
    return (
      <div className={cn(buttonStyles, "opacity-50 cursor-not-allowed")}>
        Loading...
      </div>
    );
  }

  return <WalletView wallet={wallets[0]} />;
};

const WalletView = ({ wallet }: { wallet: Wallet }) => {
=======

  if (isLoading || !wallets || wallets.length === 0) {
    return (
      <div className={cn(buttonStyles, "opacity-50 cursor-not-allowed")}>Loading...</div>
    );
  }

  // Filter wallets to only those that are of type Wallet (not AptosStandardSupportedWallet)
  const compatibleWallets = wallets.filter((w): w is Wallet => (w as Wallet).readyState !== undefined);

  if (compatibleWallets.length === 0) {
    return (
      <div className={cn(buttonStyles, "opacity-50 cursor-not-allowed")}>No compatible wallets found</div>
    );
  }

  return (
    <>
      <button
        className={cn(buttonStyles, "hover:bg-blue-700")}
        onClick={() => setShowModal(true)}
        style={{ maxWidth: "300px" }}
      >
        Connect Wallet
      </button>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white bg-opacity-80 rounded-xl p-8 shadow-xl relative min-w-[300px] min-h-[150px] flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <span className="text-lg font-bold mb-4">Connect your wallet</span>
            <WalletView wallet={compatibleWallets[0]} onConnect={() => setShowModal(false)} />
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};


const WalletView = ({ wallet, onConnect }: { wallet: Wallet; onConnect?: () => void }) => {
>>>>>>> 649fa07 (Integrated RazorKit wallet adapter with Nightly support)
  const { connect } = useWallet();
  const isWalletReady =
    wallet.readyState === WalletReadyState.Installed ||
    wallet.readyState === WalletReadyState.Loadable;
  const mobileSupport = wallet.deeplinkProvider;

  const onWalletConnectRequest = async (walletName: WalletName) => {
    try {
      await connect(walletName);
<<<<<<< HEAD
=======
      if (onConnect) onConnect();
>>>>>>> 649fa07 (Integrated RazorKit wallet adapter with Nightly support)
    } catch (error) {
      console.warn(error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      toast.success("Wallet successfully connected!");
    }
  };

  /**
   * If we are on a mobile browser, adapter checks whether a wallet has a `deeplinkProvider` property
   * a. If it does, on connect it should redirect the user to the app by using the wallet's deeplink url
   * b. If it does not, up to the dapp to choose on the UI, but can simply disable the button
   * c. If we are already in a in-app browser, we don't want to redirect anywhere, so connect should work as expected in the mobile app.
   *
   * !isWalletReady - ignore installed/sdk wallets that don't rely on window injection
   * isRedirectable() - are we on mobile AND not in an in-app browser
   * mobileSupport - does wallet have deeplinkProvider property? i.e does it support a mobile app
   */
  if (!isWalletReady && isRedirectable()) {
    // wallet has mobile app
    if (mobileSupport) {
      return (
        <button
          className={cn(buttonStyles, "hover:bg-blue-700")}
          disabled={false}
          key={wallet.name}
          onClick={() => onWalletConnectRequest(wallet.name)}
          style={{ maxWidth: "300px" }}
        >
          Connect Wallet
        </button>
      );
    }
    // wallet does not have mobile app
    return (
      <button
        className={cn(buttonStyles, "opacity-50 cursor-not-allowed")}
        disabled={true}
        key={wallet.name}
        style={{ maxWidth: "300px" }}
      >
        Connect Wallet - Desktop Only
      </button>
    );
  } else {
    // desktop
    return (
      <button
        className={cn(
          buttonStyles,
          isWalletReady ? "hover:bg-blue-700" : "opacity-50 cursor-not-allowed"
        )}
        disabled={!isWalletReady}
        key={wallet.name}
        onClick={() => onWalletConnectRequest(wallet.name)}
        style={{ maxWidth: "300px" }}
      >
        Connect Wallet
      </button>
    );
  }
};
