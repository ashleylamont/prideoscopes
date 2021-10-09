import P5 from 'p5';
import seedrandom from 'seedrandom';
import random from 'random';
import AssetManager from './assetManager';
import prideColours from './prideColours';
import flower from './flower';
import 'p5/src/math/random';

export default function drawSlice(p: P5, assetManager: AssetManager,
  input: { name: string, flag: string }, n : number): P5.Graphics {
  // @ts-ignore
  const graphics = p.createGraphics(p.windowWidth, p.windowHeight);
  graphics.noStroke();
  // @ts-ignore
  const rand = random;
  // @ts-ignore
  rand.use(seedrandom(input.name));
  const colours: string[] = prideColours[input.flag];

  console.log('================');
  for (let i = 0; i < 5; i += 1) {
    console.log(rand.float(0, 10));
  }
  const fSize = 1000;
  const xOffset = -1 * (fSize / 2);
  const baseY = p.windowHeight / 2;
  const endAngle = (Math.PI) / n;

  for (let i = 0; i < 20; i += 1) {
    // const colourIndex = random.integer(0, colours.length);
    // graphics.fill(colours.at(colourIndex));
    // flower(p, pride, p.random(0, p.windowWidth), p.random(0, p.windowHeight),
    //   p.random(50, 200), p.random(50, 200));
    const f = flower(p, colours, -xOffset, baseY, fSize, fSize, rand);
    // console.log(f);
    graphics.image(f, rand.float(xOffset, Math.sin(endAngle) * baseY + xOffset),
      rand.float(Math.sin(endAngle) * -baseY, Math.sin(endAngle) * baseY));
    // f.remove();
    // graphics.image(f, p.random(-200, -500), p.random(-100, -300));

    // graphics.circle(p.random(0, 300),
    // p.random(p.windowHeight / 2, p.windowHeight / 2 + 400), p.random(50, 200));
    // graphics.image(butterfly, p.random(0, 400),
    //  p.random(p.windowHeight / 2, p.windowHeight / 2 + 400), 150, 100);
  }
  const butterfly = assetManager.getAsset('butterfly.png');
  graphics.image(butterfly, 168, p.windowHeight / 2 + 200, 150, 100);

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
