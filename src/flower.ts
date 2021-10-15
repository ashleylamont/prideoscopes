import { Random } from 'random';
import p5 from 'p5';
// x, y : locations
// c : array of colours
// should probably make this export a flower graphics object
export default function flower(
  p: p5, c: String[], x: number, y: number, width: number, height: number,
  rand: Random, scale: number,
): p5.Graphics {
  // TODO Make scale somehow affect the resultant size of flowers
  //  (without affecting randomness or anything)
  //  Like how it's done in addImages
  const graphics = p.createGraphics(width, height);
  graphics.noStroke();
  const sType = rand.integer(0, 1);
  let radii = rand.float(50, 300);
  const w = rand.float(10, 20);
  const myRot = rand.float(0, 360);
  graphics.push();
  graphics.scale(scale);
  graphics.angleMode(p.DEGREES);
  graphics.translate(x / scale, y / scale);
  graphics.rotate(myRot);
  // function to generate petals (and a middle bit, which i called a stamen,
  // but i'm not sure its actually called that)
  function genPets(r: number, q: number, stamenType: number, sSize: number, cIndex: number) {
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
    const petalNumArray = [3, 4, 8, 12, 16];
    const num = petalNumArray.at(q);
    //    const myColStr = '001A96';
    const myCol = c.at(cIndex);
    // transformation matrix
    graphics.push();
    graphics.noStroke();
    // @ts-ignore
    const colour = p.color(myCol);
    colour.setAlpha(180);
    graphics.fill(colour);
    graphics.angleMode(p.DEGREES);
    const rAngle = (360 / num);

    for (let i = 0; i < num; i += 1) {
      graphics.rotate(rAngle);
      petal(w / 2, r / 2);
    }
    graphics.pop();
    graphics.push();
    graphics.noStroke();
    // @ts-ignore
    const alternateColour = p.color(c.at(0));
    alternateColour.setAlpha(180);
    graphics.fill(alternateColour);
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
  genPets(radii, rand.integer(0, 5), 2, 0, rand.integer(0, c.length - 1));
  radii -= (radii * 0.1);
  genPets(radii, rand.integer(0, 5), 2, 0, rand.integer(0, c.length - 1));
  radii -= (radii * 0.4);
  const sSize = rand.float(radii * 0.2, radii * 0.4);
  genPets(radii, rand.integer(0, 5), sType, sSize, rand.integer(0, c.length - 1));
  // reset transformation matrix
  graphics.pop();
  return graphics;
}
