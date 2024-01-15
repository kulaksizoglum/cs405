/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        var transformedModelMatrix = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());
        var transformedModelView = modelView;
        var transformedMvp = MatrixMult(mvp, transformedModelMatrix);
        var transformedNormals = getNormalMatrix(MatrixMult(normalMatrix, transformedModelMatrix));
        var transformedModel = transformedModelMatrix;
        
        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }        

        this.children.forEach(childNode => {
            const childTransformedModelMatrix = MatrixMult(transformedModelMatrix, childNode.trs.getTransformationMatrix());
            const childTransformedMvp = MatrixMult(mvp, childTransformedModelMatrix);
            const childTransformedNormals = getNormalMatrix(MatrixMult(normalMatrix, childTransformedModelMatrix));
    
            if (childNode.meshDrawer) {
                childNode.meshDrawer.draw(childTransformedMvp, transformedModelView, childTransformedNormals, childTransformedModelMatrix);
            }
    
            childNode.children.forEach(grandChildNode => {
                const grandChildTransformedModelMatrix = MatrixMult(childTransformedModelMatrix, grandChildNode.trs.getTransformationMatrix());
                const grandChildTransformedMvp = MatrixMult(mvp, grandChildTransformedModelMatrix);
                const grandChildTransformedNormals = getNormalMatrix(MatrixMult(normalMatrix, grandChildTransformedModelMatrix));
    
                if (grandChildNode.meshDrawer) {
                    grandChildNode.meshDrawer.draw(grandChildTransformedMvp, transformedModelView, grandChildTransformedNormals, grandChildTransformedModelMatrix);
                }
            });}
            
        )
        
        }
  
}