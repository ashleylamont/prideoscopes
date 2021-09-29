(function (P5) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var P5__default = /*#__PURE__*/_interopDefaultLegacy(P5);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const promisify = (fn) => ((args) => new Promise((resolve, reject) => {
        fn(args, resolve, reject);
    }));

    function drawSlice(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const graphics = p.createGraphics(p.windowWidth, p.windowHeight);
            graphics.noStroke();
            const colours = [
                '#5BCEFA',
                '#F5AAB9',
                '#FFFFFF',
            ];
            for (let i = 0; i < 200; i += 1) {
                graphics.fill(p.random(colours));
                graphics.circle(p.random(0, p.windowWidth), p.random(0, p.windowHeight), p.random(50, 200));
            }
            const butterfly = yield promisify(p.loadImage)('assets/butterfly.png');
            graphics.image(butterfly, 168, p.windowHeight / 2 + 200, 150, 100);
            return graphics;
        });
    }

    function drawMask(p, startAngle, endAngle) {
        const graphics = p.createGraphics(p.windowWidth, p.windowHeight);
        const size = 0.5 * p.windowHeight;
        const cx = 0;
        const cy = p.windowHeight / 2;
        graphics.noStroke();
        graphics.fill(0);
        graphics.triangle(cx, cy, cx + Math.cos(startAngle) * size, cy + Math.sin(startAngle) * size, cx + Math.cos(endAngle) * size, cy + Math.sin(endAngle) * size);
        // Do something
        return graphics;
    }

    // https://github.com/processing/p5.js/issues/2841
    function graphicsToImage(p, graphics) {
        const img = p.createImage(graphics.width, graphics.height);
        img.copy(graphics, 0, 0, graphics.width, graphics.height, 0, 0, graphics.width, graphics.height);
        return img;
    }

    function flipVertical(p, graphics) {
        const g = p.createGraphics(graphics.width, graphics.height);
        g.scale(1, -1);
        g.translate(0, -graphics.height);
        g.copy(graphics, 0, 0, graphics.width, graphics.height, 0, 0, graphics.width, graphics.height);
        return g;
    }

    if (window.localStorage.getItem('instructions') === null) {
        // Any needed instructions can go here.
        window.localStorage.setItem('instructions', 'done');
    }
    const sketch = (p) => {
        // eslint-disable-next-line no-param-reassign
        p.setup = () => __awaiter(void 0, void 0, void 0, function* () {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.background(50);
            const n = 3;
            const mask = drawMask(p, 0, (Math.PI) / n);
            const flippedMask = drawMask(p, -(Math.PI) / n, 0);
            const background = yield drawSlice(p);
            const flippedBackground = flipVertical(p, background);
            const bgImg = graphicsToImage(p, background);
            const flippedBgImage = graphicsToImage(p, flippedBackground);
            const maskImg = graphicsToImage(p, mask);
            const flippedMaskImg = graphicsToImage(p, flippedMask);
            // p.image(maskImg, 0, 0);
            // p.image(bgImg, 0, 0);
            p.translate(p.windowWidth / 2, p.windowHeight / 2);
            bgImg.mask(maskImg);
            flippedBgImage.mask(flippedMaskImg);
            for (let i = 0; i < n; i += 1) {
                p.translate(0, -p.windowHeight / 2);
                p.image(bgImg, 0, 0);
                p.image(flippedBgImage, 0, 0);
                p.translate(0, p.windowHeight / 2);
                p.rotate((2 * Math.PI) / n);
            }
        });
        // eslint-disable-next-line no-param-reassign
        p.draw = () => {
        };
    };
    // eslint-disable-next-line no-new
    new P5__default["default"](sketch);

})(p5);
//# sourceMappingURL=sketch.js.map
