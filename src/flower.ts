import P5 from 'p5';
// x, y : locations
// c : array of colours
// should probably make this export a flower graphics object
function flower(p: P5, c: any, x : number, y: number) {
  p.noStroke();
  const sType = p.random([0, 1]);
  let radi = p.random(50, 300);
  const w = p.random(10, 20);
  const myRot = p.random(0, 360);
  p.push();
  p.angleMode(p.DEGREES);
  p.translate(x, y);
  p.rotate(myRot);
  // function to generate petals (and a middle bit, which i called a stamen,
  // but i'm not sure its actually called that)
  function genPets(r: number, num: any, stamenType: number, sSize: number) {
    function petal(b: number, h: number) {
      p.beginShape();
      // base L
      p.curveVertex(-b, 0);
      p.curveVertex(-b, 0);
      // width, halfway up petal
      p.curveVertex(-w, h / 2);
      // top of the petal
      p.curveVertex(0, h);
      // width, halfway up petal
      p.curveVertex(w, h / 2);
      // base R
      p.curveVertex(b, 0);
      p.curveVertex(b, 0);
      p.endShape();
    }
    // transformation matrix
    p.push();
    p.noStroke();
    p.fill(p.random(c));
    p.angleMode(p.DEGREES);
    const rAngle = (360 / num);

    for (let i = 0; i < num; i += 1) {
      p.rotate(rAngle);
      petal(w / 2, r / 2);
    }
    p.pop();
    p.push();
    p.noStroke();
    p.fill(p.random(c));
    switch (stamenType) {
      // circle stamen
      case 0:
        p.circle(0, 0, sSize);
        break;
      // square stamen
      case 1:
        p.rect(0 - 0.25 * sSize, 0 - 0.25 * sSize, sSize * 0.5, sSize * 0.5);
        break;
      default: // do nothing
    }
    // reset transformation matrix
    p.pop();
  }
  // generate 3 lots of petals, each slightly smaller than previous
  genPets(radi, p.random([3, 4, 8, 12, 16]), 2, 0);
  radi -= (radi * 0.5);
  genPets(radi, p.random([3, 4, 8, 12, 16]), 2, 0);
  radi -= (radi * 0.4);
  const sSize = p.random(radi * 0.2, radi * 0.4);
  genPets(radi, p.random([3, 4, 8, 12, 16]), sType, sSize);
  // reset transformation matrix
  p.pop();
}
