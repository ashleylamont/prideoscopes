import P5 from 'p5';
import seedrandom from 'seedrandom';
import random from 'random';
import AssetManager from './assetManager';
import prideColours from './prideColours';
import 'p5/src/math/random';
import addFlowers from './addFlowers';
import addImages from './addImages';
import { InputParams } from './sketch';

export default function drawSlice(p: P5, assetManager: AssetManager,
  input: InputParams, width: number, height: number): P5.Graphics {
  // @ts-ignore
  const graphics = p.createGraphics(width, height);
  graphics.noStroke();
  // @ts-ignore
  const rand = random;
  // @ts-ignore
  rand.use(seedrandom(input.name + input.variant + input.seed));
  const colours: string[] = prideColours[input.flag];

  addFlowers(p, graphics, rand, colours, input);
  addImages(p, graphics, rand, colours, input, assetManager, 'butterflywhite.png', 150, 100, input.butterflies);
  addImages(p, graphics, rand, colours, input, assetManager, 'diamondwhite.png', 75, 150, input.diamonds);
  addImages(p, graphics, rand, colours, input, assetManager, 'heartwhite.png', 100, 75, input.hearts);

  return graphics;
}
