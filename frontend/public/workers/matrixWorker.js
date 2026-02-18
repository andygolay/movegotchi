let canvas = null;
let ctx = null;
let width = 0;
let height = 0;

const chars = "NARWHAL MOVERZ".split("");
const fontSize = 18;

let columns = 0;
let drops = [];

self.onmessage = (e) => {
  const data = e.data;

  if (data.type === "init") {
    canvas = data.canvas;
    ctx = canvas.getContext("2d");

    resizeCanvas(data.width, data.height);

    startAnimation();
  }

  if (data.type === "resize") {
    resizeCanvas(data.width, data.height);
  }
};

function resizeCanvas(w, h) {
  width = w;
  height = h;

  canvas.width = width;
  canvas.height = height;

  columns = Math.floor(width / fontSize);
  drops = new Array(columns).fill(1);
}

function startAnimation() {
  function draw() {
    if (!ctx) return;

    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#06b6d4";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];

      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }

    self.requestAnimationFrame(draw);
  }

  draw();
}
