let NodePoolManager = {
    _nodePools:[],
    _nodePoolNames:["player_bullet","player_tank","enemy_tank","enemy_bullet"],
    
    initNoedPools: function () {
        for (let i = 0; i < this._nodePoolNames.length; i++) {
            this.createNodePool(this._nodePoolNames[i]);
        }
        // console.log(this.getNodePool("enemy_tank"));
    },

    createNodePool: function (name){
        if (!this.getNodePool(name) && !this.getNodeElement(name)) {
            let nodePool = new cc.NodePool(name);
            this._nodePools.push(nodePool);
            return nodePool;
        }
        else {
            return null;
        }
    },

    getNodePool: function (name) {
        if (this._nodePools.length > 0) {
            for (let i = 0; i < this._nodePools.length; i++) {
                if (this._nodePools[i].poolHandlerComp === name) {
                    return this._nodePools[i];
                }
            }
            return null;
        }
    },

    getNodeElement (name) {
        let nodePool = this.getNodePool(name);
        if (nodePool) {
            let nodeElement = nodePool.get();
            return nodeElement;
        }
        else {
            return null;
        }
    },

    putNodeElemenet (name, element) {
        let nodePool = this.getNodePool(name);
        // console.log(nodePool);
        if (nodePool) {
            nodePool.put(element);
        }
    },
};

module.exports = NodePoolManager;