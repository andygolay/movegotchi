"use client";

import { ConnectButton } from "@razorlabs/razorkit";
import { Body } from "./home/Body";
import { useEffect, useRef, useState } from "react";

/* =================================================
   GEMINI AI HELPER
================================================= */

async function askGemini(userText: string): Promise<string> {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userText }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) return data?.error || "AI proxy error.";

    return data?.reply ?? "Sorry, I couldn’t reply 😕";
  } catch (err: any) {
    return `Network error: ${err?.message || String(err)}`;
  }
}

/* =================================================
   CHATBOT COMPONENT
================================================= */
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([{ role: "bot", text: "Hi! I’m Narwhal AI 🐳" }]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    try {
      const aiReply = await askGemini(userText);
      setMessages((prev) => [...prev, { role: "bot", text: aiReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "AI error. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chat Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-pink-600 text-white text-2xl border-4 border-black shadow-[4px_4px_0px_#000]"
      >
        💬
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-gray-900 border-2 border-pink-500 rounded-xl flex flex-col shadow-xl">
          {/* Header */}
          <div className="p-3 bg-pink-600 text-white font-bold flex justify-between">
            Narwhal AI
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-gray-700 text-white"
                      : "bg-pink-500 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="text-pink-400 text-xs">
                Narwhal AI is typing...
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="p-2 border-t border-pink-500 flex gap-2"
          >
            <input
               value={input}
                disabled={isTyping}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 bg-gray-800 text-white rounded disabled:opacity-50"
            />
           <button
             disabled={isTyping}
             className="px-3 bg-pink-600 text-white rounded disabled:opacity-50">
              {isTyping ? "..." : "Send"}
              </button>

          </form>
        </div>
      )}
    </div>
  );
}

/* =================================================
   MAIN PAGE
================================================= */
export default function Home() {
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
    </div>
  );
}

/* =================================================
   HEADER
================================================= */
function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white border-2 border-black shadow-[4px_4px_0px_#000]">
      <h1 className="text-2xl hidden sm:block">Narwhal Moverz</h1>
      <ConnectButton className="px-8 py-4 bg-gradient-to-br from-[#308DEF] to-[#9036EA] border-2 border-black shadow-[4px_4px_0px_#000]" />
    </header>
  );
}

/* =================================================
   BACKGROUND
================================================= */
function FallingLettersBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const chars = "NARWHAL MOVERZ".split("");
    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#06b6d4";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        drops[i] =
          y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    };

    const id = setInterval(draw, 33);
    window.addEventListener("resize", resize);

    return () => {
      clearInterval(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
