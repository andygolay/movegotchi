"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

/* =================================================
   ERROR BOUNDARY (GLOBAL CRASH PROTECTION)
================================================= */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.error("App crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-black text-white">
          <div className="text-center">
            <h1 className="text-2xl mb-4">⚠️ Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-pink-600 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* =================================================
   LAZY LOAD BODY
================================================= */
const Body = dynamic(
  () =>
    import("./home/Body").then((mod) => {
      const Component = mod.Body;
      return function WrappedBody(props: any) {
        return (
          <div className="animate-bodyFade">
            <Component {...props} />
          </div>
        );
      };
    }),
  { loading: () => <BodySkeleton /> }
);

/* =================================================
   LAZY WALLET CONNECT
================================================= */
const ConnectButton = dynamic(
  () => import("@razorlabs/razorkit").then((m) => m.ConnectButton),
  {
    ssr: false,
    loading: () => (
      <button className="px-8 py-4 bg-gray-600 border-2 border-black shadow-[4px_4px_0px_#000] text-white">
        Loading Wallet...
      </button>
    ),
  }
);

/* =================================================
   BODY SKELETON
================================================= */
function BodySkeleton() {
  return (
    <div className="mt-6 animate-pulse space-y-6">
      <div className="h-48 bg-white/20 rounded-xl"></div>
      <div className="h-6 bg-white/20 rounded w-3/4"></div>
      <div className="h-6 bg-white/20 rounded w-1/2"></div>
    </div>
  );
}

/* =================================================
   ONBOARDING MODAL
================================================= */
function OnboardingModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-8 rounded-2xl max-w-md w-full border-2 border-pink-500 shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">
          Welcome to Narwhal Moverz 🐳
        </h2>

        <p className="text-sm text-gray-300 mb-6 leading-relaxed">
          • Connect your wallet to get started.<br />
          • Explore dashboard features.<br />
          • Use Narwhal AI anytime.
        </p>

        <button
          onClick={onClose}
          className="px-6 py-3 bg-pink-600 rounded shadow-[4px_4px_0px_#000]"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

/* =================================================
   CHATBOT
================================================= */

async function askGemini(userText: string): Promise<{
  success: boolean;
  message: string;
}> {
  if (!navigator.onLine)
    return { success: false, message: "⚠️ You are offline." };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userText }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok)
      return { success: false, message: "Server error occurred." };

    const data = await res.json();

    return {
      success: true,
      message: data?.reply ?? "Empty response.",
    };
  } catch (err: any) {
    return {
      success: false,
      message:
        err.name === "AbortError"
          ? "⚠️ Request timed out."
          : "⚠️ Network error.",
    };
  }
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-pink-600 text-white text-2xl border-4 border-black shadow-[4px_4px_0px_#000]"
      >
        💬
      </button>

      {isOpen && <ChatWindow close={() => setIsOpen(false)} />}
    </div>
  );
}

function ChatWindow({ close }: { close: () => void }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm Narwhal AI 🐳" },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = async (e: any) => {
    e.preventDefault();

    if (!input.trim() || typing) return;

    const text = input;
    setInput("");
    setTyping(true);

    setMessages((p: any) => [...p, { role: "user", text }]);

    const result = await askGemini(text);

    setMessages((p: any) => [
      ...p,
      { role: result.success ? "bot" : "error", text: result.message },
    ]);

    setTyping(false);
  };

  return (
    <div className="absolute bottom-20 right-0 w-80 h-96 bg-gray-900 border-2 border-pink-500 rounded-xl flex flex-col">
      <div className="p-3 bg-pink-600 text-white flex justify-between">
        Narwhal AI
        <button onClick={close}>✕</button>
      </div>

      <div className="flex-1 p-3 overflow-y-auto">
        {messages.map((m: any, i) => (
          <div key={i} className="mb-2 text-sm">
            {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={send} className="p-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 bg-gray-800 text-white"
        />
        <button className="px-3 bg-pink-600 text-white">
          {typing ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}

/* =================================================
   HEADER
================================================= */
function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white border-2 border-black shadow-[4px_4px_0px_#000]">
      <h1 className="text-2xl hidden sm:block">
        Narwhal Moverz
      </h1>

      <ConnectButton className="px-8 py-4 bg-gradient-to-br from-[#308DEF] to-[#9036EA] border-2 border-black shadow-[4px_4px_0px_#000]" />
    </header>
  );
}

/* =================================================
   BACKGROUND (WORKER VERSION)
================================================= */

function FallingLettersBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Fallback if OffscreenCanvas not supported
    if (!canvas.transferControlToOffscreen) {
      startFallbackAnimation(canvas);
      return;
    }

    const offscreen = canvas.transferControlToOffscreen();

    const worker = new Worker("/workers/matrixWorker.js");

    workerRef.current = worker;

    worker.postMessage(
      {
        type: "init",
        canvas: offscreen,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      [offscreen]
    );

    const resize = () => {
      worker.postMessage({
        type: "resize",
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", resize);

    return () => {
      worker.terminate();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}

/* =================================================
   FALLBACK CANVAS (for Safari / unsupported)
================================================= */

function startFallbackAnimation(canvas: HTMLCanvasElement) {
  // const ctx = canvas.getContext("2d");
  const ctx = canvas.getContext("2d")!;
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = "NARWHAL MOVERZ".split("");
  const fontSize = 18;

  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#06b6d4";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text =
        chars[Math.floor(Math.random() * chars.length)];

      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height)
        drops[i] = 0;

      drops[i]++;
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* =================================================
   MAIN CONTENT
================================================= */

function HomeContent() {
  const [showOnboarding, setShowOnboarding] =
    useState(false);

  useEffect(() => {
    if (!localStorage.getItem("narwhal-visited"))
      setShowOnboarding(true);
  }, []);

  const close = () => {
    localStorage.setItem("narwhal-visited", "true");
    setShowOnboarding(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">

      <FallingLettersBackground />

      <div className="relative z-10 flex justify-center items-center h-screen px-4">

        <div className="w-full max-w-[1000px] h-[700px] bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl p-6">

          <Header />

          <Body />

        </div>

      </div>

      <Chatbot />

      {showOnboarding && (
        <OnboardingModal onClose={close} />
      )}

    </div>
  );
}

export default function Home() {
  return (
    <ErrorBoundary>
      <HomeContent />
    </ErrorBoundary>
  );
}
