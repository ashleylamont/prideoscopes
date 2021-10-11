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
  input: InputParams): P5.Graphics {
  // @ts-ignore
  const graphics = p.createGraphics(p.windowWidth, p.windowHeight);
  graphics.noStroke();
  // @ts-ignore
  const rand = random;
  // @ts-ignore
  rand.use(seedrandom(input.name + input.variant + input.randomVariant));
  const colours: string[] = prideColours[input.flag];

  addFlowers(p, graphics, rand, colours, input);
  addImages(p, graphics, rand, colours, input, assetManager, 'butterflywhite.png', 150, 100, input.butterflies, 2);
  addImages(p, graphics, rand, colours, input, assetManager, 'diamondwhite.png', 75, 150, input.diamonds, 3);
  addImages(p, graphics, rand, colours, input, assetManager, 'heartwhite.png', 100, 75, input.hearts, 3);

  return graphics;
}

/*

export default function drawSlice(
  p: P5, assetManager: AssetManager, input: { name: string, flag: string },
): P5.Graphics {
  // @ts-ignore
  // random.use(seedrandom(input.name));
  Math.seedrandom(input.name);
  const graphics = p.createGraphics(p.windowWidth, p.windowHeight);
  graphics.noStroke();

  const colours: string[] = prideColours[input.flag];
  // const pride = [
  //   '#FF1E26',
  //   '#FE941E',
  //   '#FFFF00',
  //   '#06BF00',
  //   '#001A96',
  //   '#760088',
  // ];

  for (let i = 0; i < 5; i += 1) {
    // graphics.fill(p.random(colours));
    // flower(p, pride, p.random(0, p.windowWidth), p.random(0, p.windowHeight),
    //   p.random(50, 200), p.random(50, 200));
    const f = flower(p, colours, randomRange(0, p.windowWidth), randomRange(0, p.windowHeight),
      randomRange(50, 200), randomRange(50, 200));
    graphics.image(f, randomRange(0, graphics.width), randomRange(0, graphics.height));
    f.remove();
    // graphics.circle(p.random(0, p.windowWidth), p.random(0, p.windowHeight), p.random(50, 200));
  }

  const butterfly = assetManager.getAsset('butterfly.png');
  graphics.image(butterfly, 168, p.windowHeight / 2 + 200, 150, 100);

  return graphics;
}
*/
