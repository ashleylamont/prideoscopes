import P5 from 'p5';
import dat, { GUI } from 'dat.gui';
import drawSlice from './slice';
import drawMask from './sliceMask';
import graphicsToImage from './graphicsToImage';
import flipVertical from './flipVertical';
import AssetManager from './assetManager';
import prideColours from './prideColours';

if (window.localStorage.getItem('instructions') === null) {
  // Any needed instructions can go here.
  window.localStorage.setItem('instructions', 'done');
}

// const objectHash = (window as any).objectHash as any;

const sketch = (p: P5) => {
  let gui: GUI;
  let loading: boolean = true;
  let assetManager: AssetManager;
  let input: {
    name: string,
    flag: string,
    segments: number,
    variant: number,
    flowers: boolean,
    butterflies: boolean
  };
  // eslint-disable-next-line no-param-reassign
  p.setup = async () => {
    gui = new dat.GUI({
      name: 'Pride Art Generator',
    });

    input = {
      butterflies: true,
      flowers: true,
      name: 'Name',
      flag: 'pride',
      segments: 5,
      variant: 0,
    };

    gui.add(input, 'name');
    gui.add(input, 'flag', Object.keys(prideColours));
    gui.add(input, 'segments', 2, 10, 1);
    gui.add(input, 'variant', 0, 10, 1);
    gui.add(input, 'flowers');
    gui.add(input, 'butterflies');
    gui.show();

    p.createCanvas(p.windowWidth, p.windowHeight);

    assetManager = new AssetManager(p);
    await assetManager.fetchAsset('butterflywhite.png');
    loading = false;
  };

  // eslint-disable-next-line no-param-reassign
  p.draw = () => {
    p.frameRate(1);
    p.clear();
    p.background(50);
    if (loading) {
      p.textAlign(p.CENTER, p.CENTER);
      p.fill('#FFFFFF');
      p.text('Loading...', p.width / 2, p.height / 2);
    } else {
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
      background.remove();
      flippedBackground.remove();
      mask.remove();
      flippedMask.remove();
    }
  };
};

// eslint-disable-next-line no-new
new P5(sketch);
