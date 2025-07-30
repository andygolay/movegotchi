import {
  useWallet,
  WalletReadyState,
  Wallet,
  isRedirectable,
  WalletName,
} from "@aptos-labs/wallet-adapter-react";
import { cn } from "@/utils/styling";
import { toast } from "sonner";
import React, { useState } from "react";

const buttonStyles = "nes-btn is-primary m-auto sm:m-0 sm:px-4";

export const WalletButtons = () => {
  const { wallets, connected, disconnect, isLoading } = useWallet();
  const [showModal, setShowModal] = useState(false);

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

  if (isLoading || !wallets || wallets.length === 0) {
    return (
      <div className={cn(buttonStyles, "opacity-50 cursor-not-allowed")}>
        Loading...
      </div>
    );
  }

  const compatibleWallets = wallets.filter((w): w is Wallet => (w as Wallet).readyState !== undefined);

  if (compatibleWallets.length === 0) {
    return (
      <div className={cn(buttonStyles, "opacity-50 cursor-not-allowed")}>
        No compatible wallets found
      </div>
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
  const { connect } = useWallet();
  const isWalletReady =
    wallet.readyState === WalletReadyState.Installed ||
    wallet.readyState === WalletReadyState.Loadable;
  const mobileSupport = wallet.deeplinkProvider;

  const onWalletConnectRequest = async (walletName: WalletName) => {
    try {
      await connect(walletName);
      if (onConnect) onConnect();
      toast.success("Wallet successfully connected!");
    } catch (error) {
      console.warn(error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };

  if (!isWalletReady && isRedirectable()) {
    if (mobileSupport) {
      return (
        <button
          className={cn(buttonStyles, "hover:bg-blue-700")}
          onClick={() => onWalletConnectRequest(wallet.name)}
          style={{ maxWidth: "300px" }}
        >
          Connect Wallet
        </button>
      );
    }

    return (
      <button
        className={cn(buttonStyles, "opacity-50 cursor-not-allowed")}
        disabled
        style={{ maxWidth: "300px" }}
      >
        Connect Wallet – Desktop Only
      </button>
    );
  }

  return (
    <button
      className={cn(buttonStyles, isWalletReady ? "hover:bg-blue-700" : "opacity-50 cursor-not-allowed")}
      disabled={!isWalletReady}
      onClick={() => onWalletConnectRequest(wallet.name)}
      style={{ maxWidth: "300px" }}
    >
      Connect Wallet
    </button>
  );
};
