/*!
 Transformation Matrix v2.0
 (c) Epistemex 2014-2015
 www.epistemex.com
 By Ken Fyrstenberg
 Contributions by leeoniya.
 License: MIT, header required.
 */

/**
 * 2D transformation matrix object initialized with identity matrix.
 *
 * The matrix can synchronize a canvas context by supplying the context
 * as an argument, or later apply current absolute transform to an
 * existing context.
 *
 * All values are handled as floating point values.
 *
 * @param {CanvasRenderingContext2D} [context] - Optional context to sync with Matrix
 * @prop {number} a - scale x
 * @prop {number} b - shear y
 * @prop {number} c - shear x
 * @prop {number} d - scale y
 * @prop {number} e - translate x
 * @prop {number} f - translate y
 * @prop {CanvasRenderingContext2D|null} [context=null] - set or get current canvas context
 * @constructor
 */

var Matrix = (function(){

    function reset(){
        this.props[0] = 1;
        this.props[1] = 0;
        this.props[2] = 0;
        this.props[3] = 1;
        this.props[4] = 0;
        this.props[5] = 0;
        return this;
    }

    function rotate(angle) {
        if(angle === 0){
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, mSin, -mSin, mCos, 0, 0);
    }

    function scale(sx, sy) {
        if(sx == 1 && sy == 1){
            return this;
        }
        return this._t(sx, 0, 0, sy, 0, 0);
    }

    function setTransform(a, b, c, d, e, f) {
        this.props[0] = a;
        this.props[1] = b;
        this.props[2] = c;
        this.props[3] = d;
        this.props[4] = e;
        this.props[5] = f;
        return this;
    }

    function translate(tx, ty) {
        if(tx !== 0){
            this.props[4] = this.props[0] * tx + this.props[2] * ty + this.props[4];
        }
        if(ty !== 0){
            this.props[5] = this.props[1] * tx + this.props[3] * ty + this.props[5];
        }
        return this;
    }

    function transform(a2, b2, c2, d2, e2, f2) {

        var a1 = this.props[0];
        var b1 = this.props[1];
        var c1 = this.props[2];
        var d1 = this.props[3];
        var e1 = this.props[4];
        var f1 = this.props[5];

        if(a2 === 1 && b2 === 0 && c2 === 0 && d2 === 1){
            if(e2 !== 0 || f2 !== 0){
                this.props[4] = this.props[0] * e2 + this.props[2] * f2 + this.props[4];
                this.props[5] = this.props[1] * e2 + this.props[3] * f2 + this.props[5];
            }
            return this;
        }

        /* matrix order (canvas compatible):
         * ace
         * bdf
         * 001
         */
        this.props[0] = a1 * a2 + c1 * b2;
        this.props[1] = b1 * a2 + d1 * b2;
        this.props[2] = a1 * c2 + c1 * d2;
        this.props[3] = b1 * c2 + d1 * d2;
        this.props[4] = a1 * e2 + c1 * f2 + e1;
        this.props[5] = b1 * e2 + d1 * f2 + f1;

        return this;
    }

    function applyToPoint(x, y) {

        return {
            x: x * this.props[0] + y * this.props[2] + this.props[4],
            y: x * this.props[1] + y * this.props[3] + this.props[5]
        };
        /*return {
         x: x * me.a + y * me.c + me.e,
         y: x * me.b + y * me.d + me.f
         };*/
    }

    function applyToPointArray(x,y){
        return [x * this.props[0] + y * this.props[2] + this.props[4],x * this.props[1] + y * this.props[3] + this.props[5]];
    }
    function applyToPointStringified(x, y) {
        return (bm_rnd(x * this.props[0] + y * this.props[2] + this.props[4]))+','+(bm_rnd(x * this.props[1] + y * this.props[3] + this.props[5]));
    }

    function toArray() {
        return [this.props[0],this.props[1],this.props[2],this.props[3],this.props[4],this.props[5]];
    }

    function toCSS() {
        this.cssParts[1] = this.props.join(',');
        return this.cssParts.join('');
        //return "matrix(" + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ")";
    }

    function toString() {
        return "" + this.toArray();
    }

    return function(){
        this.reset = reset;
        this.rotate = rotate;
        this.scale = scale;
        this.setTransform = setTransform;
        this.translate = translate;
        this.transform = transform;
        this.applyToPoint = applyToPoint;
        this.applyToPointArray = applyToPointArray;
        this.applyToPointStringified = applyToPointStringified;
        this.toArray = toArray;
        this.toCSS = toCSS;
        this.toString = toString;
        this._t = this.transform;

        this.props = [1,0,0,1,0,0];

        this.cssParts = ['matrix(','',')'];
    }
}());

function Matrix() {


}