import P5 from 'p5';
// x, y : locations
// c : array of colours
// should probably make this export a flower graphics object
export default function flower(
  p: P5, c: P5.Color[], x : number, y: number, width: number, height: number,
): P5.Graphics {
  const graphics = p.createGraphics(width, height);
  graphics.noStroke();
  const sType = p.random([0, 1]);
  let radi = p.random(50, 300);
  const w = p.random(10, 20);
  const myRot = p.random(0, 360);
  graphics.push();
  graphics.angleMode(p.DEGREES);
  graphics.translate(x, y);
  graphics.rotate(myRot);
  // function to generate petals (and a middle bit, which i called a stamen,
  // but i'm not sure its actually called that)
  function genPets(r: number, num: any, stamenType: number, sSize: number) {
    function petal(b: number, h: number) {
      graphics.beginShape();
      // base L
      graphics.curveVertex(-b, 0);
      graphics.curveVertex(-b, 0);
      // width, halfway up petal
      graphics.curveVertex(-w, h / 2);
      // top of the petal
      graphics.curveVertex(0, h);
      // width, halfway up petal
      graphics.curveVertex(w, h / 2);
      // base R
      graphics.curveVertex(b, 0);
      graphics.curveVertex(b, 0);
      graphics.endShape();
    }
    // transformation matrix
    graphics.push();
    graphics.noStroke();
    graphics.fill(p.random(c));
    graphics.angleMode(p.DEGREES);
    const rAngle = (360 / num);

    for (let i = 0; i < num; i += 1) {
      graphics.rotate(rAngle);
      petal(w / 2, r / 2);
    }
    graphics.pop();
    graphics.push();
    graphics.noStroke();
    graphics.fill(p.random(c));
    switch (stamenType) {
      // circle stamen
      case 0:
        graphics.circle(0, 0, sSize);
        break;
      // square stamen
      case 1:
        graphics.rect(0 - 0.25 * sSize, 0 - 0.25 * sSize, sSize * 0.5, sSize * 0.5);
        break;
      default: // do nothing
    }
    // reset transformation matrix
    graphics.pop();
  }
  // generate 3 lots of petals, each slightly smaller than previous
  genPets(radi, p.random([3, 4, 8, 12, 16]), 2, 0);
  radi -= (radi * 0.5);
  genPets(radi, p.random([3, 4, 8, 12, 16]), 2, 0);
  radi -= (radi * 0.4);
  const sSize = p.random(radi * 0.2, radi * 0.4);
  genPets(radi, p.random([3, 4, 8, 12, 16]), sType, sSize);
  // reset transformation matrix
  graphics.pop();
  return graphics;
}
