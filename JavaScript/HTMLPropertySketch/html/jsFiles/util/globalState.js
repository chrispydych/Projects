var globalState = function(){
    this.drawMode = false; // for drawing lines
    this.panMode = false;
    this.translateMode = false; // for moving shapes around
    this.templateMode = false; //for anchoring drawing with the basic shapes
    this.commonPointMode = false;
    this.lineEditMode = false;
    this.shapeEditMode = false;
    this.curveMode = false;

    this.height = 700
    this.width = 700

    // keep track of highest, lowest, rightest, and leftest coordinates for auto zoom
    this.topCoordinate = this.height;
    this.bottomCoordinate = 0;
    this.leftmostCoordinate = this.width;
    this.rightmostCoordinate = 0;

    this.selectedShape = null;
    this.currentWorkingShape = null;
    this.commonShapeStartPoint = null;
    this.tempPF = null;
    this.tempC1 = null;
    this.tempC2 = null;
    this.selectedLine = null;

    this.inC1 = false;
    this.inC2 = false;

    this.shapeObjArray = [];
    this.numShapes = 0;

    this.gridLength = 10;
    this.lineThickness = 2;

    this.labelFontSize = 15;

    this.xOffset = 0;
    this.yOffset = 0;

    this.tempX = 0;
    this.tempY = 0;

    this.zoomDeg = 1;

    this.hitZone = 5;



    this.zoomIn = function(){ this.zoomDeg += .1;}
    this.zoomOut = function(){ ((this.zoomDeg >= .2) ? this.zoomDeg -= .1 : this.zoomDeg = .1); }
    this.getZoomDeg = function(){ return this.zoomDeg; }

    this.setXOffset = function(x){ this.xOffset = x; }
    this.setYOffset = function(y){ this.yOffset = y; }

    this.getXOffset = function(){ return this.xOffset; }
    this.getYOffset = function(){ return this.yOffset; }

    this.setTempX = function(x){ this.tempX = x; }
    this.setTempY = function(y){ this.tempY = y; }

    this.getTempX = function(){ return this.tempX; }
    this.getTempY = function(){ return this.tempY; }

    this.setMouseDown = function(state){ this.mouseDown = state; }
    this.getMouseDown = function(){ return this.mouseDown; }

    this.getHeight = function() { return this.height; }
    this.getWidth = function() { return this.width; }

    this.getTopCoordinate = function() { return this.topCoordinate; }
    this.getBottomCoordinate = function() { return this.bottomCoordinate; }
    this.getLeftmostCoordinate = function() { return this.leftmostCoordinate; }
    this.getRightmostCoordinate = function() { return this.rightmostCoordinate; }

    this.setTopCoordinate = function(y) { this.topCoordinate = y; }
    this.setBottomCoordinate = function(y) { this.bottomCoordinate = y; }
    this.setLeftmostCoordinate = function(x) { this.leftmostCoordinate = x; }
    this.setRightmostCoordinate = function(x) { this.rightmostCoordinate = x; }

    this.setDrawMode = function(state){ this.drawMode = state; }
    this.setPanMode = function(state){ this.panMode = state; }
    this.setTranslateMode = function(state){ this.translateMode = state; }
    this.setTemplateMode = function(state){ this.templateMode = state; }
    this.setCommonPointMode = function(state){ this.commonPointMode = state; }
    this.setLineEditMode = function(state){ this.lineEditMode = state; }
    this.setShapeEditMode = function(state){ this.shapeEditMode = state; }
    this.setCurveMode = function(state) { this.curveMode = state; }

    this.getDrawMode = function(){ return this.drawMode; }
    this.getPanMode = function(){ return this.panMode; }
    this.getTranslateMode = function(){ return this.translateMode; }
    this.getTemplateMode = function(){ return this.templateMode; }
    this.getCommonPointMode = function() { return this.commonPointMode; }
    this.getLineEditMode = function(){ return this.lineEditMode; }
    this.getShapeEditMode = function(){ return this.shapeEditMode; }
    this.getCurveMode = function() { return this.curveMode; }

    this.setCommonShapeStartPoint = function(point){ this.commonShapeStartPoint = point; }
    this.getCommonShapeStartPoint = function(){ return this.commonShapeStartPoint; }

    this.setTempPF = function(point){ this.tempPF = point; }
    this.setTempC1 = function(point){ this.tempC1 = point; }
    this.setTempC2 = function(point){ this.tempC2 = point; }

    this.getTempPF = function(){ return this.tempPF; }
    this.getTempC1 = function(){ return this.tempC1; }
    this.getTempC2 = function(){ return this.tempC2; }

    this.setSelectedShape = function(shape){ this.selectedShape = shape; }
    this.getSelectedShape = function(){ return this.selectedShape; }

    this.setSelectedLine = function(line){ this.selectedLine = line; }
    this.getSelectedLine = function(){ return this.selectedLine; }

    this.setInC1 = function(state){ this.inC1 = state; }
    this.setInC2 = function(state){ this.inC2 = state; }

    this.getInC1 = function(){ return this.inC1; }
    this.getInC2 = function(){ return this.inC1; }

    this.getNumShapes = function(){ return this.numShapes; }
    this.getShape = function(i){ return this.shapeObjArray[i]; }

    this.getCurrentWorkingShape = function(){
        if(this.getCommonShapeStartPoint() == null){ return null; }
        if(this.currentWorkingShape == null){
            this.currentWorkingShape = new shapeObj(this.getCommonShapeStartPoint());
            return this.currentWorkingShape;
        }
        else{
            return this.currentWorkingShape;
        }
    }

    this.addShape = function(shape){
        shape = calcAreaPerimCentroid(shape);
        this.shapeObjArray[this.numShapes] = shape;
        addRow(shape, this.getNumShapes());
        this.numShapes++;
        this.currentWorkingShape = null;
        this.commonShapeStartPoint = null;
    }
}
