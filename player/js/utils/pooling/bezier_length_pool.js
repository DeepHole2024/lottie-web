/* global poolFactory */
/* exported bezierLengthPool */

import {
  getDefaultCurveSegments,
} from '../common';
import {
  createTypedArray,
} from '../helpers/arrays';

const bezierLengthPool = (function () {
  function create() {
    return {
      addedLength: 0,
      percents: createTypedArray('float32', getDefaultCurveSegments()),
      lengths: createTypedArray('float32', getDefaultCurveSegments()),
    };
  }
  return poolFactory(8, create);
}());

export default bezierLengthPool;
