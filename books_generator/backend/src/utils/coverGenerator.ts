import { createCanvas, CanvasRenderingContext2D } from "canvas";
import { createSeededRNG } from "../utils/random.ts";

export async function generateBookCover(
  title: string,
  author: string,
  seed: string
): Promise<Buffer> {
  const width = 200;
  const height = 300;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const rng = createSeededRNG(seed);

  const baseLightness = 60 + rng() * 30;

  ctx.fillStyle = `hsla(120, 40%, ${baseLightness}%, ${0.4 + rng() * 0.3})`;
  ctx.fillRect(0, 0, width, height);
  drawRandomCircles(ctx, width, height, 20, rng, baseLightness);

  ctx.fillStyle = "#111";
  ctx.font = "bold 16px sans-serif";
  wrapText(ctx, title, 10, 50, width - 20, 22);

  ctx.font = "italic 14px sans-serif";
  wrapText(ctx, `by ${author}`, 10, height - 40, width - 20, 20);

  return canvas.toBuffer("image/png");
}

function drawRandomCircles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  count: number,
  rng: () => number,
  baseLightness: number
) {
  for (let i = 0; i < count; i++) {
    const x = rng() * width;
    const y = rng() * height;
    const radius = 10 + rng() * 30;

    // Варьируем цвет в синих тонах с изменением насыщенности и яркости
    const hue = 200 + rng() * 50;
    const saturation = 40 + rng() * 60;
    const lightness = Math.min(
      100,
      Math.max(0, baseLightness - 20 + rng() * 40)
    );
    const alpha = 0.1 + rng() * 0.4;

    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
