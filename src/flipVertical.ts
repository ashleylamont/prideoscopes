import P5 from 'p5';

export default function flipVertical(p: P5, graphics: P5.Graphics): P5.Graphics {
  const g = p.createGraphics(graphics.width, graphics.height);
  g.scale(1, -1);
  g.translate(0, -graphics.height);
  g.copy(graphics, 0, 0, graphics.width, graphics.height, 0, 0, graphics.width, graphics.height);
  return g;
}
