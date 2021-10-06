import P5 from 'p5';
import seedrandom from 'seedrandom';
import random from 'random';
import AssetManager from './assetManager';
import prideColours from './prideColours';
import flower from './flower';

export default function drawSlice(
  p: P5, assetManager: AssetManager, input: { name: string, flag: string },
): P5.Graphics {
  // @ts-ignore
  random.use(seedrandom(input.name));

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
    const f = flower(p, colours, p.random(0, p.windowWidth), p.random(0, p.windowHeight),
      p.random(50, 200), p.random(50, 200));
    graphics.image(f, p.random(0, graphics.width), p.random(0, graphics.height));
    f.remove();
    // graphics.circle(p.random(0, p.windowWidth), p.random(0, p.windowHeight), p.random(50, 200));
  }

  const butterfly = assetManager.getAsset('butterfly.png');
  graphics.image(butterfly, 168, p.windowHeight / 2 + 200, 150, 100);

  return graphics;
}
