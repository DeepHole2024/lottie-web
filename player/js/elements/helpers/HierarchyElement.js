function HierarchyElement(){}

HierarchyElement.prototype.initHierarchy = function() {
    this.hierarchy = [];
}

HierarchyElement.prototype.resetHierarchy = function(){
    this.hierarchy.length = 0;
};

HierarchyElement.prototype.getHierarchy = function(){
    return this.hierarchy;
};

HierarchyElement.prototype.setHierarchy = function(hierarchy){
    this.hierarchy = hierarchy;
};

HierarchyElement.prototype.checkParenting = function(){
    if(this.data.parent !== undefined){
        this.comp.buildElementParenting(this, this.data.parent);
    }
};

HierarchyElement.prototype.prepareHierarchy = function(){
    
};