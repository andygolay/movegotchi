import { useState } from "react";
import { PiShuffleAngularFill } from "react-icons/pi";

export interface ShuffleButtonProps {
  handleShuffle: () => Promise<void>; 
}

export function ShuffleButton({ handleShuffle }: ShuffleButtonProps) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      await handleShuffle();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-semibold shadow-md transition-transform duration-300 ${
        loading ? "opacity-60 cursor-not-allowed" : "hover:scale-105"
      }`}
    >
      {loading ? (
        <span className="animate-pulse">Shuffling...</span>
      ) : (
        <>
          <PiShuffleAngularFill size={20} />
          <span>Shuffle</span>
        </>
      )}
    </button>
  );
}