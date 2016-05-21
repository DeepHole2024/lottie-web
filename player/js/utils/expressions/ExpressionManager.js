var ExpressionManager = (function(){
    var ob = {};

    function sum(a,b) {
        var tOfA = typeof a;
        var tOfB = typeof b;
        if((tOfA === 'number' || tOfA === 'boolean') && (tOfB === 'number' || tOfB === 'boolean')) {
            return a + b;
        }
        if(tOfA === 'object' && (tOfB === 'number' || tOfB === 'boolean')){
            a[0] = a[0] + b;
            return a;
        }
        if((tOfA === 'number' || tOfA === 'boolean') && tOfB === 'object'){
            b[0] = a + b[0];
            return b;
        }
        if(tOfA === 'object' && tOfB === 'object'){
            var i = 0, lenA = a.length, lenB = b.length;
            var retArr = [];
            while(i<lenA || i < lenB){
                if(typeof a[i] === 'number' && typeof b[i] === 'number'){
                    retArr[i] = a[i] + b[i];
                }else{
                    retArr[i] = a[i] || b[i];
                }
                i += 1;
            }
            return retArr;
        }
        return 0;
    }

    function sub(a,b) {
        var tOfA = typeof a;
        var tOfB = typeof b;
        if((tOfA === 'number' || tOfA === 'boolean') && (tOfB === 'number' || tOfB === 'boolean')) {
            return a - b;
        }
        if(tOfA === 'object' && (tOfB === 'number' || tOfB === 'boolean')){
            a[0] = a[0] - b;
            return a;
        }
        if((tOfA === 'number' || tOfA === 'boolean') && tOfB === 'object'){
            b[0] = a - b[0];
            return b;
        }
        if(tOfA === 'object' && tOfB === 'object'){
            var i = 0, lenA = a.length, lenB = b.length;
            var retArr = [];
            while(i<lenA || i < lenB){
                if(typeof a[i] === 'number' && typeof b[i] === 'number'){
                    retArr[i] = a[i] - b[i];
                }else{
                    retArr[i] = a[i] || b[i];
                }
                i += 1;
            }
            return retArr;
        }
        return 0;
    }

    function mul(a,b) {
        var tOfA = typeof a;
        var tOfB = typeof b;
        if((tOfA === 'number' || tOfA === 'boolean') && (tOfB === 'number' || tOfB === 'boolean')) {
            return a * b;
        }

        var i, len;
        if(tOfA === 'object' && (tOfB === 'number' || tOfB === 'boolean')){
            len = a.length;
            arr = Array.apply(null,{length:len});
            for(i=0;i<len;i+=1){
                arr[i] = a[i] * b;
            }
            return arr;
        }
        if((tOfA === 'number' || tOfA === 'boolean') && tOfB === 'object'){
            len = b.length;
            arr = Array.apply(null,{length:len});
            for(i=0;i<len;i+=1){
                arr[i] = a * b[i];
            }
            return arr;
        }
        return 0;
    }

    function div(a,b) {
        var tOfA = typeof a;
        var tOfB = typeof b;
        if((tOfA === 'number' || tOfA === 'boolean') && (tOfB === 'number' || tOfB === 'boolean')) {
            return a / b;
        }
        var i, len;
        if(tOfA === 'object' && (tOfB === 'number' || tOfB === 'boolean')){
            len = a.length;
            arr = Array.apply(null,{length:len});
            for(i=0;i<len;i+=1){
                arr[i] = a[i] / b;
            }
            return arr;
        }
        if((tOfA === 'number' || tOfA === 'boolean') && tOfB === 'object'){
            len = b.length;
            arr = Array.apply(null,{length:len});
            for(i=0;i<len;i+=1){
                arr[i] = a / b[i];
            }
            return arr;
        }
        return 0;
    }

    function clamp(num, min, max) {
        if(min > max){
            var mm = max;
            max = min;
            min = mm;
        }
        return Math.min(Math.max(num, min), max);
    }

    function radiansToDegrees(val) {
        return val/degToRads;
    }

    function length(arr1,arr2){
        var i,len = Math.min(arr1.length,arr2.length);
        var addedLength = 0;
        for(i=0;i<len;i+=1){
            addedLength += Math.pow(arr2[i]-arr1[i],2);
        }
        return Math.sqrt(addedLength);
    }

    function linear(t, tMin, tMax, value1, value2){
        if(t <= tMin) {
            return value1;
        }else if(t >= tMax){
            return value2;
        }
        var perc = t/(tMax-tMin);
        if(!value1.length){
            return value1 + (value2-value1)*perc;
        }
        var i, len = value1.length;
        var arr = Array.apply( null, { length: len } );
        for(i=0;i<len;i+=1){
            arr[i] = value1[i] + (value2[i]-value1[i])*perc;
        }
        return arr;
    }

    function seedRandom(seed){
        BMMath.seedrandom(seed);
    };
    function random(min,max){
        if(max === undefined){
            if(min === undefined){
                min = 0;
                max = 1;
            } else {
                max = min;
                min = undefined;
            }
        }
        if(max.length){
            var i, len = max.length;
            if(!min){
                min = Array.apply(null,{length:len});
            }
            var arr = Array.apply(null,{length:len});
            var rnd = BMMath.random();
            for(i=0;i<len;i+=1){
                arr[i] = min[i] + rnd*(max[i]-min[i])
            }
            return arr;
        }
        if(min === undefined){
            min = 0;
        }
        var rndm = BMMath.random();
        return min + rndm*(max-min);
    }

    function initiateExpression(elem,data){
        var val = data.x;
        var transform,content,effect;
        var thisComp = elem.comp;
        elem.comp.frameDuration = 1/thisComp.globalData.frameRate;
        var inPoint = elem.data.ip/thisComp.globalData.frameRate;
        var outPoint = elem.data.op/thisComp.globalData.frameRate;
        var thisLayer = elem;
        var fnStr = 'var fn = function(){'+val+';this.v = $bm_rt;}';
        eval(fnStr);
        var bindedFn = fn.bind(this);
        var numKeys = data.k ? data.k.length : 0;


        var wiggle = function wiggle(freq,amp){
            var i,j, len = this.pv.length ? this.pv.length : 1;
            var addedAmps = Array.apply(null,{len:len});
            for(j=0;j<len;j+=1){
                addedAmps[j] = 0;
            }
            freq = 5;
            var iterations = Math.floor(time*freq);
            i = 0;
            j = 0;
            while(i<iterations){
                //var rnd = BMMath.random();
                for(j=0;j<len;j+=1){
                    addedAmps[j] += -amp + amp*2*BMMath.random();
                    //addedAmps[j] += -amp + amp*2*rnd;
                }
                i += 1;
            }
            //var rnd2 = BMMath.random();
            var periods = time*freq;
            var perc = periods - Math.floor(periods);
            var arr = Array.apply({length:len});
            for(j=0;j<len;j+=1){
                arr[j] = this.pv[j] + addedAmps[j] + (-amp + amp*2*BMMath.random())*perc;
                //arr[j] = this.pv[j] + addedAmps[j] + (-amp + amp*2*rnd)*perc;
                //arr[i] = this.pv[i] + addedAmp + amp1*perc + amp2*(1-perc);
            }
            return arr;
        }.bind(this);

        var loopIn = function loopIn(type,duration, durationFlag) {
            if(!this.k){
                return this.pv;
            }
            var currentFrame = time*thisComp.globalData.frameRate;
            var keyframes = this.keyframes;
            var firstKeyFrame = keyframes[0].t;
            if(currentFrame>=firstKeyFrame){
                return this.pv;
            }else{
                var cycleDuration, lastKeyFrame;
                if(!durationFlag){
                    if(!duration || duration > keyframes.length - 1){
                        duration = keyframes.length - 1;
                    }
                    lastKeyFrame = keyframes[duration].t;
                    cycleDuration = lastKeyFrame - firstKeyFrame;
                } else {
                    if(!duration){
                        cycleDuration = Math.max(0,this.elem.data.op - firstKeyFrame);
                    } else {
                        cycleDuration = Math.abs(thisComp.globalData.frameRate*duration);
                    }
                    lastKeyFrame = firstKeyFrame + cycleDuration;
                }
                var i, len, ret;
                if(type === 'pingpong') {
                    var iterations = Math.floor((firstKeyFrame - currentFrame)/cycleDuration);
                    if(iterations % 2 === 0){
                        return this.getValueAtTime((firstKeyFrame - currentFrame)%cycleDuration +  firstKeyFrame);
                    }
                } else if(type === 'offset'){
                    var initV = this.getValueAtTime(firstKeyFrame);
                    var endV = this.getValueAtTime(lastKeyFrame);
                    var current = this.getValueAtTime(cycleDuration - (firstKeyFrame - currentFrame)%cycleDuration +  firstKeyFrame);
                    var repeats = Math.floor((firstKeyFrame - currentFrame)/cycleDuration)+1;
                    if(this.pv.length){
                        ret = new Array(initV.length);
                        len = ret.length;
                        for(i=0;i<len;i+=1){
                            ret[i] = current[i]-(endV[i]-initV[i])*repeats;
                        }
                        return ret;
                    }
                    return current-(endV-initV)*repeats;
                } else if(type === 'continue'){
                    var firstValue = this.getValueAtTime(firstKeyFrame);
                    var nextFirstValue = this.getValueAtTime(firstKeyFrame + 0.001);
                    if(this.pv.length){
                        ret = new Array(firstValue.length);
                        len = ret.length;
                        for(i=0;i<len;i+=1){
                            ret[i] = firstValue[i] + (firstValue[i]-nextFirstValue[i])*(firstKeyFrame - currentFrame)/0.0005;
                        }
                        return ret;
                    }
                    return firstValue + (firstValue-nextFirstValue)*(firstKeyFrame - currentFrame)/0.0005;
                }
                return this.getValueAtTime(cycleDuration - (firstKeyFrame - currentFrame)%cycleDuration +  firstKeyFrame);
            }
        }.bind(this);

        var loopInDuration = function loopInDuration(type,duration){
            return loopIn(type,duration,true);
        }.bind(this);

        var loopOut = function loopOut(type,duration,durationFlag){
            if(!this.k){
                return this.pv;
            }
            var currentFrame = time*thisComp.globalData.frameRate;
            var keyframes = this.keyframes;
            var lastKeyFrame = keyframes[keyframes.length - 1].t;
            if(currentFrame<=lastKeyFrame){
                return this.pv;
            }else{
                var cycleDuration, firstKeyFrame;
                if(!durationFlag){
                    if(!duration || duration > keyframes.length - 1){
                        duration = keyframes.length - 1;
                    }
                    firstKeyFrame = keyframes[keyframes.length - 1 - duration].t;
                    cycleDuration = lastKeyFrame - firstKeyFrame;
                } else {
                    if(!duration){
                        cycleDuration = Math.max(0,lastKeyFrame - this.elem.data.ip);
                    } else {
                        cycleDuration = Math.abs(lastKeyFrame - thisComp.globalData.frameRate*duration);
                    }
                    firstKeyFrame = lastKeyFrame - cycleDuration;
                }
                var i, len, ret;
                if(type === 'pingpong') {
                    var iterations = Math.floor((currentFrame - firstKeyFrame)/cycleDuration);
                    if(iterations % 2 !== 0){
                        return this.getValueAtTime(cycleDuration - (currentFrame - firstKeyFrame)%cycleDuration +  firstKeyFrame);
                    }
                } else if(type === 'offset'){
                    var initV = this.getValueAtTime(firstKeyFrame);
                    var endV = this.getValueAtTime(lastKeyFrame);
                    var current = this.getValueAtTime((currentFrame - firstKeyFrame)%cycleDuration +  firstKeyFrame);
                    var repeats = Math.floor((currentFrame - firstKeyFrame)/cycleDuration);
                    if(this.pv.length){
                        ret = new Array(initV.length);
                        len = ret.length;
                        for(i=0;i<len;i+=1){
                            ret[i] = (endV[i]-initV[i])*repeats + current[i];
                        }
                        return ret;
                    }
                    return (endV-initV)*repeats + current;
                } else if(type === 'continue'){
                    var lastValue = this.getValueAtTime(lastKeyFrame);
                    var nextLastValue = this.getValueAtTime(lastKeyFrame - 0.001);
                    if(this.pv.length){
                        ret = new Array(lastValue.length);
                        len = ret.length;
                        for(i=0;i<len;i+=1){
                            ret[i] = lastValue[i] + (lastValue[i]-nextLastValue[i])*(currentFrame - lastKeyFrame)/0.0005;
                        }
                        return ret;
                    }
                    return lastValue + (lastValue-nextLastValue)*(currentFrame - lastKeyFrame)/0.0005;
                }
                return this.getValueAtTime((currentFrame - firstKeyFrame)%cycleDuration +  firstKeyFrame);
            }
        }.bind(this);

        var loopOutDuration = function loopOutDuration(type,duration){
            return loopOut(type,duration,true);
        }.bind(this);

        var valueAtTime = function valueAtTime(t) {
            return this.getValueAtTime(t*thisComp.globalData.frameRate);
        }.bind(this);

        var velocityAtTime = function velocityAtTime(t) {
            return this.getVelocityAtTime(t*thisComp.globalData.frameRate);
        }.bind(this);

        function effect(nm){
            return elem.effectsManager(nm);
        }

        function lookAt(elem1,elem2){
            var fVec = [elem2[0]-elem1[0],elem2[1]-elem1[1],elem2[2]-elem1[2]];
            var pitch = Math.atan2(fVec[0],Math.sqrt(fVec[1]*fVec[1]+fVec[2]*fVec[2]))/degToRads;
            var yaw = -Math.atan2(fVec[1],fVec[2])/degToRads;
            return [yaw,pitch,0];
        }

        function easeOut(t, val1, val2){
            return -(val2-val1) * t*(t-2) + val1;
        }

        function nearestKey(time){
            var i, len = data.k.length,index;
            if(!data.k.length || typeof(data.k[0]) === 'number'){
                index = 0;
            } else {
                for(i=0;i<len;i+=1){
                    if(time === data.k[i].t){
                        index = i + 1;
                        break;
                    }else if(time<data.k[i].t){
                        index = i + 1;
                        break;
                    }else if(time>data.k[i].t && i === len - 1){
                        index = len;
                        break;
                    }
                }
            }
            var ob = {};
            ob.index = index;
            return ob;
        }

        function key(ind){
            if(!data.k.length || typeof(data.k[0]) === 'number'){
                return {time:0};
            }
            ind -= 1;
            var ob = {
                time: data.k[ind].t/thisComp.globalData.frameRate
            };
            var arr;
            if(ind === data.k.length - 1){
                arr = data.k[ind-1].e;
            }else{
                arr = data.k[ind].s;
            }
            var i, len = arr.length;
            for(i=0;i<len;i+=1){
                ob[i] = arr[i];
            }
            return ob;
        }

        function hasParentGetter(){
        }

        Object.defineProperty(this, "hasParent", { get: hasParentGetter});
        var time, value,textIndex,textTotal,selectorValue, index = elem.data.ind + 1;
        var hasParent = !!(elem.hierarchy && elem.hierarchy.length);
        function execute(){
            //seedRandom(0);
            if(this.type === 'textSelector'){
                textIndex = this.textIndex;
                textTotal = this.textTotal;
                selectorValue = this.selectorValue;
            }
            if(!transform){
                transform = elem.transform;
            }
            if(!content && elem.content){
                content = elem.content.bind(elem);
            }
            if(this.lock){
                this.v = this.pv;
                return true;
            }
            this.lock = true;
            if(this.getPreValue){
                this.getPreValue();
            } else {
                if(this.frameId === elem.globalData.frameId){
                    return;
                }
                this.frameId = elem.globalData.frameId;
            }
            value = this.pv;
            time = this.comp.renderedFrame/this.comp.globalData.frameRate;
            bindedFn();
            var i,len;
            if(this.mult){
                if(typeof this.v === 'number'){
                    this.v *= this.mult;
                }else{
                    if(!this.v) {
                        console.log(val);
                    }
                    len = this.v.length;
                    if(value === this.v){
                        this.v = len === 2 ? [value[0],value[1]] : [value[0],value[1],value[2]];
                    }
                    for(i = 0; i < len; i += 1){
                        this.v[i] *= this.mult;
                    }
                }
            }
            if(typeof this.v === 'number'){
                if(this.lastValue !== this.v){
                    this.lastValue = this.v;
                    this.mdf = true;
                }
            }else if(this.v.i){
                // Todo Improve validation for masks and shapes
                this.mdf = true;
            }else{
                /*if(!this.lastValue){
                }*/
                len = this.v.length;
                for(i = 0; i < len; i += 1){
                    if(this.v[i] !== this.lastValue[i]){
                        this.lastValue[i] = this.v[i];
                        this.mdf = true;
                    }
                }
            }
            this.lock = false;
        }
        return execute;
    }

    ob.initiateExpression = initiateExpression;
    return ob;
}());