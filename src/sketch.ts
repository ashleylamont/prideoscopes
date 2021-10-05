import P5 from 'p5';
import dat, { GUI } from 'dat.gui';
import drawSlice from './slice';
import drawMask from './sliceMask';
import graphicsToImage from './graphicsToImage';
import flipVertical from './flipVertical';

if (window.localStorage.getItem('instructions') === null) {
  // Any needed instructions can go here.
  window.localStorage.setItem('instructions', 'done');
}

const objectHash = (window as any).objectHash as any;

const sketch = (p: P5) => {
  let gui: GUI;
  // eslint-disable-next-line no-param-reassign
  p.setup = async () => {
    gui = new dat.GUI({
      name: 'Pride Art Generator',
    });

    const input = {
      name: 'Name',
      flag: 'pride',
    };

    gui.add(input, 'name');
    gui.show();

    // const nameHash = hash.default(name);
    console.log(objectHash);
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(50);
    const n = 3;
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
    const background = await drawSlice(p);
    const flippedBackground = flipVertical(p, background);
    const bgImg = graphicsToImage(p, background);
    const flippedBgImage = graphicsToImage(p, flippedBackground);
    const maskImg = graphicsToImage(p, mask);
    const flippedMaskImg = graphicsToImage(p, flippedMask);
    // p.image(maskImg, 0, 0);
    // p.image(bgImg, 0, 0);
    p.translate(p.windowWidth / 2, p.windowHeight / 2);
    bgImg.mask(maskImg);
    flippedBgImage.mask(flippedMaskImg);
    for (let i = 0; i < n; i += 1) {
      p.translate(0, -p.windowHeight / 2);
      p.image(bgImg, 0, 0);
      p.image(flippedBgImage, 0, 0);
      p.translate(0, p.windowHeight / 2);

      p.rotate((2 * Math.PI) / n);
    }
  };

  // eslint-disable-next-line no-param-reassign
  p.draw = () => {
  };
};

// eslint-disable-next-line no-new
new P5(sketch);
