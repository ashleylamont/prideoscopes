import P5 from 'p5';
import { pointInPolygon } from 'geometric';
import { Random } from 'random';
import AssetManager from './assetManager';
import graphicsToImage from './graphicsToImage';
import { InputParams } from './sketch';

export default function addImages(
  p: P5, graphics: P5.Graphics, rand: Random, colours: string[],
  input: InputParams, assetManager: AssetManager,
  imagePath: string, width: number, height: number,
  draw: boolean, qty: number,
): void {
  const triangleSize = 0.5 * p.windowHeight;
  const triangleCx = 0;
  const triangleCy = p.windowHeight / 2;

  const slicePolygon: [number, number][] = [
    [triangleCx, triangleCy],
    [triangleCx + Math.cos(0) * triangleSize,
      triangleCy + Math.sin(0) * triangleSize],
    [triangleCx + Math.cos((Math.PI) / input.segments) * triangleSize,
      triangleCy + Math.sin((Math.PI) / input.segments) * triangleSize],
  ];

  for (let i = 0; i < qty; i += 1) {
    const point: [number, number] = [0, 0];
    do {
      // Just spam random points until we intersect the triangle.
      point[0] = rand.float(0, p.windowWidth);
      point[1] = rand.float(0, p.windowHeight);
    } while (!pointInPolygon(point, slicePolygon));
    const image = assetManager.getAsset(imagePath);
    const colour = colours[rand.int(0, colours.length - 1)];
    const rotation = rand.float(0, Math.PI * 2);
    if (draw) {
      const solidColourGraphics = p.createGraphics(image.width, image.height);
      const pColour = p.color(colour);
      pColour.setAlpha(180);
      solidColourGraphics.background(pColour);
      const solidColourImage = graphicsToImage(p, solidColourGraphics);
      // GC hates me and it hates canvases.
      solidColourGraphics.remove();
      solidColourImage.mask(image);
      graphics.imageMode(p.CENTER);
      graphics.translate(width / 2 + point[0], height / 2 + point[1]);
      graphics.rotate(rotation);
      graphics.image(solidColourImage, 0, 0, width, height);
      graphics.rotate(-rotation);
      graphics.translate(-(width / 2 + point[0]), -(height / 2 + point[1]));
    }
  }
}
