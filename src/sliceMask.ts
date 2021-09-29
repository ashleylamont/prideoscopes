import P5 from 'p5';

export default function drawMask(p: P5, startAngle: number, endAngle: number)
  : P5.Graphics {
  const graphics = p.createGraphics(p.windowWidth, p.windowHeight);
  const size = 0.5 * p.windowHeight;
  const cx = 0;
  const cy = p.windowHeight / 2;

  graphics.noStroke();
  graphics.fill(0);

  graphics.triangle(
    cx,
    cy,
    cx + Math.cos(startAngle) * size,
    cy + Math.sin(startAngle) * size,
    cx + Math.cos(endAngle) * size,
    cy + Math.sin(endAngle) * size,
  );
  // Do something
  return graphics;
}
