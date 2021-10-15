import P5 from 'p5';

export default function drawMask(
  p: P5, startAngle: number, endAngle: number, width: number, height: number,
): P5.Graphics {
  const graphics = p.createGraphics(width, height);
  const size = 0.5 * height;
  const cx = 0;
  const cy = height / 2;

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
