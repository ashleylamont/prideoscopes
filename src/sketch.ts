import P5 from 'p5';
import dat, { GUI } from 'dat.gui';
import AssetManager from './assetManager';
import prideColours from './prideColours';
import draw from './draw';
import graphicsToImage from './graphicsToImage';

export interface InputParams {
  name: string;
  flag: string;
  segments: number;
  flowerScale: number;
  butterflyScale: number;
  diamondScale: number;
  heartScale: number;
  flowers: number;
  butterflies: number;
  hearts: number;
  diamonds: number;
  backgroundColor: string;
  transparentBg: boolean;
  seed: string;
  randomise: ()=>void;
  draw: ()=>void;
  save: ()=>void;
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
      name: 'Name',
      flag: 'pride',
      segments: 5,
      flowerScale: 1.5,
      butterflyScale: 1.5,
      diamondScale: 1.5,
      heartScale: 1.5,
      seed: '',
      randomise: () => {},
      backgroundColor: '#323232',
      butterflies: 4,
      flowers: 4,
      diamonds: 4,
      hearts: 4,
      transparentBg: true,
      draw: () => {},
      save: () => {},
    };

    gui.add(input, 'name');
    gui.add(input, 'flag', Object.keys(prideColours));
    gui.add(input, 'segments', 2, 10, 1);
    gui.add(input, 'flowerScale', 0.1, 5);
    gui.add(input, 'butterflyScale', 0.1, 5);
    gui.add(input, 'diamondScale', 0.1, 5);
    gui.add(input, 'heartScale', 0.1, 5);
    gui.add(input, 'seed').listen();
    gui.add(input, 'flowers', 0, 10, 1);
    gui.add(input, 'butterflies', 0, 10, 1);
    gui.add(input, 'diamonds', 0, 10, 1);
    gui.add(input, 'hearts', 0, 10, 1);
    gui.addColor(input, 'backgroundColor');
    gui.add(input, 'transparentBg');
    gui.add(input, 'randomise');
    gui.add(input, 'draw');
    gui.add(input, 'save');
    gui.show();

    canvas = p.createGraphics(2000, 2000);

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
      input.seed = Math.round(Math.random() * 10e8).toString(16);
      input.draw();
    };
    input.save = () => {
      graphicsToImage(p, canvas).save(input.name, 'png');
    };

    input.draw();
  };

  // eslint-disable-next-line no-param-reassign
  p.draw = () => {
    p.frameRate(1);
    p.clear();
    p.background(input.backgroundColor);
    if (loading) {
      p.textAlign(p.CENTER, p.CENTER);
      p.fill('#FFFFFF');
      p.text('Loading...', p.width / 2, p.height / 2);
    } else {
      p.image(canvas, 0, 0,
        Math.min(p.windowWidth, p.windowHeight), Math.min(p.windowWidth, p.windowHeight));
    }
  };
};

// eslint-disable-next-line no-new
new P5(sketch);
