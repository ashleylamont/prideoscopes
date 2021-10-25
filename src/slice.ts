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
  const colours: string[] = prideColours[input['Pride Flag']];

  addFlowers(p, graphics, rand, colours, input);
  addImages(p, graphics, rand, colours, input, assetManager,
    'butterflywhite.png', 150 * input['Butterfly Scale'],
    100 * input['Butterfly Scale'], input['Number of Butterflies']);
  addImages(p, graphics, rand, colours, input, assetManager,
    'diamondwhite.png', 75 * input['Diamond Scale'],
    150 * input['Diamond Scale'], input['Number of Diamonds']);
  addImages(p, graphics, rand, colours, input, assetManager,
    'heartwhite.png', 100 * input['Heart Scale'],
    75 * input['Heart Scale'], input['Number of Hearts']);

  return graphics;
}
