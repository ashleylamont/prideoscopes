import P5 from 'p5';
import promisify from './promisify';

export default async function drawSlice(p: P5): Promise<P5.Graphics> {
  const graphics = p.createGraphics(p.windowWidth, p.windowHeight);
  graphics.noStroke();

  const colours = [
    '#5BCEFA',
    '#F5AAB9',
    '#FFFFFF',
  ];

  for (let i = 0; i < 200; i += 1) {
    graphics.fill(p.random(colours));
    graphics.circle(p.random(0, p.windowWidth), p.random(0, p.windowHeight), p.random(50, 200));
  }

  const butterfly = await promisify(p.loadImage)('assets/butterfly.png');
  graphics.image(butterfly, 168, p.windowHeight / 2 + 200, 150, 100);

  return graphics;
}
