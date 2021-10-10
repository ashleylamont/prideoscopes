import P5 from 'p5';
import { pointInPolygon } from 'geometric';
import { Random } from 'random';
import AssetManager from './assetManager';
import graphicsToImage from './graphicsToImage';

export default function addButterflies(
  p: P5, graphics: P5.Graphics, rand: Random, colours: string[],
  input: {
    name: string,
    flag: string,
    segments: number,
    variant: number,
    flowers: boolean,
    butterflies: boolean
  }, assetManager: AssetManager,
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

  for (let i = 0; i < 2; i += 1) {
    const point: [number, number] = [0, 0];
    do {
      // Just spam random points until we intersect the triangle.
      point[0] = rand.float(0, p.windowWidth);
      point[1] = rand.float(0, p.windowHeight);
    } while (!pointInPolygon(point, slicePolygon));
    const butterflyImage = assetManager.getAsset('butterflywhite.png');
    const colour = colours[rand.int(0, colours.length - 1)];
    const butterflyRotation = rand.float(0, Math.PI * 2);
    if (input.butterflies) {
      const solidColourGraphics = p.createGraphics(butterflyImage.width, butterflyImage.height);
      solidColourGraphics.background(colour);
      const solidColourImage = graphicsToImage(p, solidColourGraphics);
      // GC hates me and it hates canvases.
      solidColourGraphics.remove();
      solidColourImage.mask(butterflyImage);
      graphics.imageMode(p.CENTER);
      graphics.translate(50 + point[0], 50 + point[1]);
      graphics.rotate(butterflyRotation);
      graphics.image(solidColourImage, 0, 0, 100, 100);
      graphics.rotate(-butterflyRotation);
      graphics.translate(-(50 + point[0]), -(50 + point[1]));
    }
  }
}
