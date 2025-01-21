"use client";

import dynamic from "next/dynamic";
import { Body } from "./home/Body";
import { useEffect, useRef } from "react";

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      {/* Falling letters background */}
      <FallingLettersBackground />

      {/* Content with white background */}
      <div className="relative z-10 flex sm:justify-center sm:items-center sm:h-screen sm:overflow-hidden">
        <div className="w-screen sm:w-[1200px] sm:h-[800px] sm:m-auto border-4 border-black border-solid bg-white bg-opacity-80">
          <Header />
          <Body />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="md:sticky top-0 z-10 flex justify-between items-center md:px-6 py-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 shadow-md w-full gap-2">
      <h1 className="text-2xl hidden sm:block">Narwhal Moverz</h1>
      <WalletButtons />
    </header>
  );
}

const WalletButtons = dynamic(
  async () => {
    const { WalletButtons } = await import("@/components/WalletButtons");
    return { default: WalletButtons };
  },
  {
    loading: () => (
      <div className="nes-btn is-primary opacity-50 cursor-not-allowed">
        Loading...
      </div>
    ),
    ssr: false,
  }
);

function FallingLettersBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Early return if canvas is null or undefined

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Early return if the context is null or undefined

    // Function to set canvas size
    const setCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    setCanvasSize(); // Set initial canvas size

    const characters = "NARWHAL MOVERZ".split("");
    const font_size = 18;
    const columns = Math.floor(canvas.width / font_size); // Number of columns
    const drops = Array(columns).fill(1); // One drop per column

    // Function to draw the falling letters
    const draw = () => {
      if (!ctx || !canvas) return; // Check both canvas and context to ensure they're defined

      // Black background with slight opacity for trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gold text color
      ctx.fillStyle = "#ffd700";
      ctx.font = font_size + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        // Send drop back to the top randomly after it has crossed the screen
        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment Y coordinate
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33);

    // Resize canvas on window resize
    const resizeHandler = () => {
      setCanvasSize();
    };
    window.addEventListener("resize", resizeHandler);

    // Cleanup function to clear interval and event listener
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}



