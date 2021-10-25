import P5 from 'p5';
import dat, { GUI } from 'dat.gui';
import AssetManager from './assetManager';
import prideColours from './prideColours';
import draw from './draw';
import graphicsToImage from './graphicsToImage';
import './styles.css';

export interface InputParams {
  'User Name': string;
  'Pride Flag': string;
  'Number of Segments': number;
  'Flowers Scale': number;
  'Butterfly Scale': number;
  'Diamond Scale': number;
  'Heart Scale': number;
  'Number of Flowers': number;
  'Number of Butterflies': number;
  'Number of Hearts': number;
  'Number of Diamonds': number;
  'Background Color': string;
  'Use Transparent Background': boolean;
  'Preview Sticker Shape': boolean;
  'Random Seed': string;
  'New Random Seed': ()=>void;
  'Randomise Artwork Settings': ()=>void;
  'Draw Sticker': ()=>void;
  'Save Sticker': ()=>void;
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
      'User Name': 'Name',
      'Pride Flag': 'pride',
      'Number of Segments': 5,
      'Flowers Scale': 1.5,
      'Butterfly Scale': 1.5,
      'Diamond Scale': 1.5,
      'Heart Scale': 1.5,
      'Random Seed': '',
      'New Random Seed': () => {},
      'Background Color': '#323232',
      'Number of Butterflies': 4,
      'Number of Flowers': 4,
      'Number of Diamonds': 4,
      'Number of Hearts': 4,
      'Use Transparent Background': true,
      'Preview Sticker Shape': false,
      'Draw Sticker': () => {},
      'Save Sticker': () => {},
      'Randomise Artwork Settings': () => {},
    };

    const inputsFolder = gui.addFolder('Inputs');
    inputsFolder.add(input, 'User Name');
    inputsFolder.add(input, 'Random Seed').listen();
    inputsFolder.add(input, 'New Random Seed');
    const parametersFolder = gui.addFolder('Artwork Settings');
    parametersFolder.add(input, 'Pride Flag', Object.keys(prideColours));
    parametersFolder.add(input, 'Number of Segments', 2, 10, 1).listen();
    parametersFolder.add(input, 'Flowers Scale', 0.5, 5).listen();
    parametersFolder.add(input, 'Butterfly Scale', 0.5, 5).listen();
    parametersFolder.add(input, 'Diamond Scale', 0.5, 5).listen();
    parametersFolder.add(input, 'Heart Scale', 0.5, 5).listen();
    parametersFolder.add(input, 'Number of Flowers', 0, 10, 1).listen();
    parametersFolder.add(input, 'Number of Butterflies', 0, 10, 1).listen();
    parametersFolder.add(input, 'Number of Diamonds', 0, 10, 1).listen();
    parametersFolder.add(input, 'Number of Hearts', 0, 10, 1).listen();
    parametersFolder.add(input, 'Randomise Artwork Settings');
    const stickerFolder = gui.addFolder('Sticker Settings');
    stickerFolder.addColor(input, 'Background Color');
    stickerFolder.add(input, 'Use Transparent Background');
    gui.add(input, 'Preview Sticker Shape', true);
    gui.add(input, 'Draw Sticker');
    gui.add(input, 'Save Sticker');
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

    input['Draw Sticker'] = () => draw(input, p, assetManager, canvas);
    input['New Random Seed'] = () => {
      input['Random Seed'] = Math.round(Math.random() * 10e8).toString(16);
      input['Draw Sticker']();
    };
    input['Save Sticker'] = () => {
      input['Preview Sticker Shape'] = false;
      input['Draw Sticker']();
      graphicsToImage(p, canvas).save(input['User Name'], 'png');
    };

    input['Randomise Artwork Settings'] = () => {
      input['Number of Segments'] = Math.round(Math.random() * (10 - 2) + 2);
      input['Flowers Scale'] = Math.random() * (5 - 0.5) + 0.5;
      input['Butterfly Scale'] = Math.random() * (5 - 0.5) + 0.5;
      input['Heart Scale'] = Math.random() * (5 - 0.5) + 0.5;
      input['Diamond Scale'] = Math.random() * (5 - 0.5) + 0.5;
      input['Number of Flowers'] = Math.round(Math.random() * (10 - 1) + 1);
      input['Number of Diamonds'] = Math.round(Math.random() * (10 - 1) + 1);
      input['Number of Hearts'] = Math.round(Math.random() * (10 - 1) + 1);
      input['Number of Butterflies'] = Math.round(Math.random() * (10 - 1) + 1);

      input['Draw Sticker']();
    };

    input['Draw Sticker']();
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
    p.background(input['Background Color']);

    // Maybe we want to actually move this outside of the thing so we can have the toggle change it
    if (input['Preview Sticker Shape']) {
      p.push();
      // gutter circle
      // p.circle(p.windowWidth / 2, p.windowHeight / 2, p.windowHeight + 25);
      // display sticker gutter
      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.rotate(1.5708);
      p.noStroke();
      p.fill('rgba(28,27,30,0.25)');
      drawPolygon(input['Number of Segments'] * 2, 30, 30, p.height);
      p.stroke('#1c1b1e');
      p.fill('#FFFFFF');
      if (input['Use Transparent Background']) {
        p.noFill();
      }
      p.strokeWeight(2);
      drawPolygon(input['Number of Segments'] * 2, 0, 0, p.height);
      p.pop();
    }
    if (loading) {
      p.textAlign(p.CENTER, p.CENTER);
      p.fill('#FFFFFF');
      p.text('Loading...', p.width / 2, p.height / 2);
    } else {
      const s = Math.min(p.windowWidth, p.windowHeight);
      if (input['Preview Sticker Shape']) {
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
