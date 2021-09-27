import P5 from "p5";

if(window.localStorage.getItem('instructions') === null) {
  // Any needed instructions can go here.
  window.localStorage.setItem('instructions', 'done');
}

const sketch = (p: P5)=>{
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  }

  p.draw = () => {
  }
}

new P5(sketch);
