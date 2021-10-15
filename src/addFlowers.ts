import P5 from 'p5';
import { pointInPolygon } from 'geometric';
import { Random } from 'random';
import flower from './flower';
import { InputParams } from './sketch';

export default function addFlowers(
  p: P5, graphics: P5.Graphics, rand: Random, colours: string[],
  input: InputParams,
): void {
  const triangleSize = 0.5 * graphics.height;
  const triangleCx = 0;
  const triangleCy = graphics.height / 2;

  const slicePolygon: [number, number][] = [
    [triangleCx, triangleCy],
    [triangleCx + Math.cos(0) * triangleSize,
      triangleCy + Math.sin(0) * triangleSize],
    [triangleCx + Math.cos((Math.PI) / input.segments) * triangleSize,
      triangleCy + Math.sin((Math.PI) / input.segments) * triangleSize],
  ];

  for (let i = 0; i < 6; i += 1) {
    const point: [number, number] = [0, 0];
    do {
      // Just spam random points until we intersect the triangle.
      point[0] = rand.float(0, graphics.width);
      point[1] = rand.float(0, graphics.height);
    } while (!pointInPolygon(point, slicePolygon));
    const f = flower(p, colours, ...point, graphics.width, graphics.height, rand);
    // Generate the flower regardless to not affect random number generation.
    if (input.flowers) graphics.image(f, 0, 0);
    f.remove();
  }
}
