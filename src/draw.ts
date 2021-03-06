import P5 from 'p5';
import drawMask from './sliceMask';
import drawSlice from './slice';
import flipVertical from './flipVertical';
import graphicsToImage from './graphicsToImage';
import { InputParams } from './sketch';
import AssetManager from './assetManager';

export default function draw(
  input: InputParams,
  p: P5,
  assetManager: AssetManager,
  graphics: P5.Graphics,
): void {
  graphics.clear();
  const n = input['Number of Segments'];
  const mask = drawMask(
    p,
    0,
    (Math.PI) / n,
    graphics.width,
    graphics.height,
  );
  const flippedMask = drawMask(
    p,
    -(Math.PI) / n,
    0,
    graphics.width,
    graphics.height,
  );

  // background polygon
  function drawPolygon(num, x, y, d) {
    graphics.beginShape();
    for (let i = 0; i < num + 1; i += 1) {
      const angle = (p.TWO_PI / num) * i;
      const px = x + (p.sin(angle) * d) / 2;
      const py = y - (p.cos(angle) * d) / 2;
      graphics.vertex(px, py, 0);
    }
    graphics.endShape();
  }

  if (!input['Use Transparent Background']) {
    graphics.push();
    graphics.noStroke();
    graphics.translate(graphics.width / 2, graphics.height / 2);
    // calling angle mode breaks the program for some reason, so this is 90 degrees in radians
    graphics.rotate(1.5708);
    graphics.fill(input['Background Color']);
    drawPolygon(input['Number of Segments'] * 2, 0, 0, graphics.width);
    graphics.pop();
  }

  const background = drawSlice(p, assetManager, input, graphics.width, graphics.height);
  const flippedBackground = flipVertical(p, background);
  const bgImg = graphicsToImage(p, background);
  const flippedBgImage = graphicsToImage(p, flippedBackground);
  const maskImg = graphicsToImage(p, mask);
  const flippedMaskImg = graphicsToImage(p, flippedMask);
  graphics.translate(graphics.width / 2, graphics.height / 2);

  bgImg.mask(maskImg);
  flippedBgImage.mask(flippedMaskImg);
  for (let i = 0; i < n; i += 1) {
    graphics.translate(0, -graphics.height / 2);
    graphics.image(bgImg, 0, 0);
    graphics.image(flippedBgImage, 0, 0);
    graphics.translate(0, graphics.height / 2);

    graphics.rotate((2 * Math.PI) / n);
  }
  graphics.translate(-graphics.width / 2, -graphics.height / 2);
  background.remove();
  flippedBackground.remove();
  mask.remove();
  flippedMask.remove();
}
