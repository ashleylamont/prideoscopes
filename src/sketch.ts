import P5 from 'p5';
import dat, { GUI } from 'dat.gui';
import AssetManager from './assetManager';
import prideColours from './prideColours';
import draw from './draw';

export interface InputParams {
  name: string;
  flag: string;
  segments: number;
  variant: number;
  flowers: boolean;
  butterflies: boolean;
  number_butterflies: number;
  hearts: boolean;
  number_hearts: number;
  diamonds: boolean;
  number_diamonds: number;
  backgroundColor: string;
  randomVariant: number;
  randomise: ()=>void;
  draw: ()=>void;
}

if (window.localStorage.getItem('instructions') === null) {
  // Any needed instructions can go here.
  window.localStorage.setItem('instructions', 'done');
}

const sketch = (p: P5) => {
  let gui: GUI;
  let loading: boolean = true;
  let assetManager: AssetManager;
  let input: InputParams;
  let canvas: P5.Graphics;
  // eslint-disable-next-line no-param-reassign
  p.setup = async () => {
    gui = new dat.GUI({
      name: 'Pride Art Generator',
    });

    input = {
      butterflies: true,
      number_butterflies: 2,
      flowers: true,
      name: 'Name',
      flag: 'pride',
      segments: 5,
      variant: 0,
      randomVariant: 0,
      randomise: () => {},
      backgroundColor: '#FFFFFF',
      diamonds: true,
      number_diamonds: 2,
      hearts: true,
      number_hearts: 3,
      draw: () => {},
    };

    gui.add(input, 'name');
    gui.add(input, 'flag', Object.keys(prideColours));
    gui.add(input, 'segments', 2, 10, 1);
    gui.add(input, 'variant', 0, 10, 1);
    gui.add(input, 'flowers');
    gui.add(input, 'butterflies');
    gui.add(input, 'number_butterflies', 1, 10, 1);
    gui.add(input, 'diamonds');
    gui.add(input, 'number_diamonds', 1, 10, 1);
    gui.add(input, 'hearts');
    gui.add(input, 'number_hearts', 1, 10, 1);
    gui.addColor(input, 'backgroundColor');
    gui.add(input, 'randomise');
    gui.add(input, 'draw');
    gui.show();

    canvas = p.createGraphics(p.windowWidth, p.windowHeight);

    p.createCanvas(p.windowWidth, p.windowHeight);

    assetManager = new AssetManager(p);
    await Promise.all([
      assetManager.fetchAsset('butterflywhite.png'),
      assetManager.fetchAsset('diamondwhite.png'),
      assetManager.fetchAsset('heartwhite.png'),
    ]);
    loading = false;

    input.draw = () => draw(input, p, assetManager, canvas);
    input.randomise = () => {
      input.randomVariant = Math.random();
      input.draw();
    };

    input.draw();
  };

  // eslint-disable-next-line no-param-reassign
  p.draw = () => {
    p.frameRate(1);
    p.clear();
    // p.background(220);
    // gutter circle
    p.fill('#FFFFFF');
    p.noStroke();
    p.circle(p.windowWidth / 2, p.windowHeight / 2, p.windowHeight + 25);
    if (loading) {
      p.textAlign(p.CENTER, p.CENTER);
      p.fill('#FFFFFF');
      p.text('Loading...', p.width / 2, p.height / 2);
    } else {
      p.image(canvas, 0, 0);
    }
  };
};

// eslint-disable-next-line no-new
new P5(sketch);
