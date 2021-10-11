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
  const n = input.segments;
  const mask = drawMask(
    p,
    0,
    (Math.PI) / n,
  );
  const flippedMask = drawMask(
    p,
    -(Math.PI) / n,
    0,
  );
  const background = drawSlice(p, assetManager, input);
  const flippedBackground = flipVertical(p, background);
  const bgImg = graphicsToImage(p, background);
  const flippedBgImage = graphicsToImage(p, flippedBackground);
  const maskImg = graphicsToImage(p, mask);
  const flippedMaskImg = graphicsToImage(p, flippedMask);
  graphics.translate(p.windowWidth / 2, p.windowHeight / 2);
  bgImg.mask(maskImg);
  flippedBgImage.mask(flippedMaskImg);
  for (let i = 0; i < n; i += 1) {
    graphics.translate(0, -p.windowHeight / 2);
    graphics.image(bgImg, 0, 0);
    graphics.image(flippedBgImage, 0, 0);
    graphics.translate(0, p.windowHeight / 2);

    graphics.rotate((2 * Math.PI) / n);
  }
  graphics.translate(-p.windowWidth / 2, -p.windowHeight / 2);
  background.remove();
  flippedBackground.remove();
  mask.remove();
  flippedMask.remove();
}