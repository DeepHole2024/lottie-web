function ISolidElement(data, animationItem,parentContainer,globalData){
    this.parent.constructor.call(this,data, animationItem,parentContainer,globalData);
}
createElement(BaseElement, ISolidElement);

ISolidElement.prototype.createElements = function(){
    this.parent.createElements.call(this);

    var rect = document.createElementNS(svgNS,'rect');
    rect.setAttribute('width',this.data.width);
    rect.setAttribute('height',this.data.height);
    /*rect.setAttribute('width',1);
    rect.setAttribute('height',1);*/
    rect.setAttribute('fill',this.data.color);
    this.layerElement.appendChild(rect);
    this.rectElement = rect;
};

ISolidElement.prototype.renderFrame = function(num,parentMatrix){
    var renderParent = this.parent.renderFrame.call(this,num,parentMatrix);
    if(renderParent===false){
        if(!this.hidden){
            this.rectElement.setAttribute('opacity','0');
            this.hidden = true;
        }
        return;
    }
    this.hidden = false;
    if(!this.data.hasMask){
        if(!this.renderedFrames[this.globalData.frameNum]){
            this.renderedFrames[this.globalData.frameNum] = {
                tr: 'matrix('+this.finalTransform.mat.props.join(',')+')',
                o: this.finalTransform.opacity
            }
        }
        var renderedFrameData = this.renderedFrames[this.globalData.frameNum];
        if(this.lastData.tr != renderedFrameData.tr){
            this.lastData.tr = renderedFrameData.tr;
            this.layerElement.setAttribute('transform',renderedFrameData.tr);
        }
        if(this.lastData.o != renderedFrameData.o){
            this.lastData.o = renderedFrameData.o;
            this.layerElement.setAttribute('opacity',renderedFrameData.o);
        }
    }
};