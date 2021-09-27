import P5 from 'p5';

if (window.localStorage.getItem('instructions') === null) {
  // Any needed instructions can go here.
  window.localStorage.setItem('instructions', 'done');
}

const sketch = (p: P5) => {
  // eslint-disable-next-line no-param-reassign
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  // eslint-disable-next-line no-param-reassign
  p.draw = () => {
  };
};

// eslint-disable-next-line no-new
new P5(sketch);
