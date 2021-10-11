import P5 from 'p5';
import dat, { GUI } from 'dat.gui';
import { debounce } from 'lodash';
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
  hearts: boolean;
  diamonds: boolean;
  backgroundColor: string;
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
      flowers: true,
      name: 'Name',
      flag: 'pride',
      segments: 5,
      variant: 0,
      backgroundColor: '#323232',
      diamonds: true,
      hearts: true,
    };

    const controllers: dat.GUIController[] = [];

    controllers.push(gui.add(input, 'name'));
    controllers.push(gui.add(input, 'flag', Object.keys(prideColours)));
    controllers.push(gui.add(input, 'segments', 2, 10, 1));
    controllers.push(gui.add(input, 'variant', 0, 10, 1));
    controllers.push(gui.add(input, 'flowers'));
    controllers.push(gui.add(input, 'butterflies'));
    controllers.push(gui.add(input, 'diamonds'));
    controllers.push(gui.add(input, 'hearts'));
    gui.addColor(input, 'backgroundColor');
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

    function redrawCanvas() {
      draw(input, p, assetManager, canvas);
    }

    const debounced = debounce(redrawCanvas, 500);

    controllers.forEach((controller) => {
      controller.onChange(debounced);
    });
    redrawCanvas();
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
      p.image(canvas, 0, 0);
    }
  };
};

// eslint-disable-next-line no-new
new P5(sketch);
