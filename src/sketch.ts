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
  previewMode: boolean;
  seed: string;
  generateSeed: ()=>void;
  randomiseParams: ()=>void;
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
      generateSeed: () => {},
      backgroundColor: '#323232',
      butterflies: 4,
      flowers: 4,
      diamonds: 4,
      hearts: 4,
      transparentBg: true,
      previewMode: false,
      draw: () => {},
      save: () => {},
      randomiseParams: () => {},
    };

    gui.add(input, 'name');
    gui.add(input, 'flag', Object.keys(prideColours));
    gui.add(input, 'previewMode', true);
    gui.add(input, 'segments', 2, 10, 1).listen();
    gui.add(input, 'flowerScale', 0.5, 5).listen();
    gui.add(input, 'butterflyScale', 0.5, 5).listen();
    gui.add(input, 'diamondScale', 0.5, 5).listen();
    gui.add(input, 'heartScale', 0.5, 5).listen();
    gui.add(input, 'flowers', 0, 10, 1).listen();
    gui.add(input, 'butterflies', 0, 10, 1).listen();
    gui.add(input, 'diamonds', 0, 10, 1).listen();
    gui.add(input, 'hearts', 0, 10, 1).listen();
    gui.addColor(input, 'backgroundColor');
    gui.add(input, 'transparentBg');
    gui.add(input, 'randomiseParams');
    gui.add(input, 'generateSeed');
    gui.add(input, 'seed').listen();
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
    input.generateSeed = () => {
      input.seed = Math.round(Math.random() * 10e8).toString(16);
      input.draw();
    };
    input.save = () => {
      input.previewMode = false;
      input.draw();
      graphicsToImage(p, canvas).save(input.name, 'png');
    };

    input.randomiseParams = () => {
      input.segments = Math.round(Math.random() * (10 - 2) + 2);
      input.flowerScale = Math.random() * (5 - 0.5) + 0.5;
      input.butterflyScale = Math.random() * (5 - 0.5) + 0.5;
      input.heartScale = Math.random() * (5 - 0.5) + 0.5;
      input.diamondScale = Math.random() * (5 - 0.5) + 0.5;
      input.flowers = Math.round(Math.random() * (10 - 1) + 1);
      input.diamonds = Math.round(Math.random() * (10 - 1) + 1);
      input.hearts = Math.round(Math.random() * (10 - 1) + 1);
      input.butterflies = Math.round(Math.random() * (10 - 1) + 1);

      input.draw();
    };

    input.draw();
  };

  // eslint-disable-next-line no-param-reassign
  p.draw = () => {
    // maybe should move this to another file but eh
    function drawPolygon(num, x, y, d) {
      p.beginShape();
      for (let i = 0; i < num + 1; i += 1) {
        const angle = (p.TWO_PI / num) * i;
        const px = x + (p.sin(angle) * d) / 2;
        const py = y - (p.cos(angle) * d) / 2;
        p.vertex(px, py, 0);
      }
      p.endShape();
    }
    p.frameRate(1);
    p.clear();
    p.background(input.backgroundColor);

    // Maybe we want to actually move this outside of the thing so we can have the toggle change it
    if (input.previewMode) {
      p.push();
      // gutter circle
      // p.circle(p.windowWidth / 2, p.windowHeight / 2, p.windowHeight + 25);
      // display sticker gutter
      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.rotate(1.5708);
      p.noStroke();
      p.fill('rgba(28,27,30,0.25)');
      drawPolygon(input.segments * 2, 30, 30, p.height);
      p.stroke('#1c1b1e');
      p.fill('#FFFFFF');
      if (input.transparentBg) {
        p.noFill();
      }
      p.strokeWeight(2);
      drawPolygon(input.segments * 2, 0, 0, p.height);
      p.pop();
    }
    if (loading) {
      p.textAlign(p.CENTER, p.CENTER);
      p.fill('#FFFFFF');
      p.text('Loading...', p.width / 2, p.height / 2);
    } else {
      const s = Math.min(p.windowWidth, p.windowHeight);
      if (input.previewMode) {
        p.image(canvas, p.windowWidth / 2 - ((s - 100) / 2), p.windowHeight / 2 - ((s - 100) / 2),
          s - 100, s - 100);
      } else {
        p.image(canvas, p.windowWidth / 2 - (s / 2), 0, s, s);
      }
    }
  };
};

// eslint-disable-next-line no-new
new P5(sketch);
