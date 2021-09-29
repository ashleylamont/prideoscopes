// https://github.com/processing/p5.js/issues/2841

import P5 from 'p5';

export default function graphicsToImage(p: P5, graphics: P5.Graphics): P5.Image {
  const img = p.createImage(graphics.width, graphics.height);
  img.copy(graphics, 0, 0, graphics.width, graphics.height, 0, 0, graphics.width, graphics.height);
  return img;
}
