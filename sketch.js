(function (P5) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var P5__default = /*#__PURE__*/_interopDefaultLegacy(P5);

    if (window.localStorage.getItem('instructions') === null) {
        // Any needed instructions can go here.
        window.localStorage.setItem('instructions', 'done');
    }
    const sketch = (p) => {
        // eslint-disable-next-line no-param-reassign
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight);
        };
        // eslint-disable-next-line no-param-reassign
        p.draw = () => {
        };
    };
    // eslint-disable-next-line no-new
    new P5__default["default"](sketch);

})(p5);
//# sourceMappingURL=sketch.js.map
