
const shapeObj = function(p0){
    this.metadata = new meta();

    this.metadata.setName("Shape" + (globalStateData.getNumShapes()+1));
    this.metadata.setColor(getRandomColor());

    this.lineList = [];
    this.pointList = [];

    this.pointList[0] = p0;

    this.numLines = 0;
    this.numPoints = 0;


    this.addStraightLine = function(point){
        //alert("Pointlist: " + JSON.stringify(this.pointList))
        // alert("(x, y):  (" + JSON.stringify(point.x) + ", " + JSON.stringify(point.y) + ")");
        // alert(this.pointList[this.numPoints].x + ", " + this.pointList[this.numPoints].y);
        this.lineList[this.numLines] = new lineObj(this.pointList[this.numPoints], point);
        this.numLines++;
        this.numPoints++;
        this.pointList[this.numPoints] = point;
    }

    this.addCurvedLine = function(point, c1, c2){
        this.lineList[this.numLines] = new lineObj(this.pointList[this.numPoints], point, true, c1, c2);
        this.numPoints++;
        this.numLines++;
        this.pointList[this.numPoints] = point;
    }

    this.addLastLine = function(){
        this.addStraightLine(this.pointList[0]);
    }

    this.incrementAll = function(x, y){
        for(let i = 0; i < this.getNumPoints(); i++){
            this.getPoint(i).x += x;
            this.getPoint(i).y += y;
        }
    }

    this.movePoint = function(x, y, i){
        this.getLine((i + 1) % this.getNumLines()).getFirst().x += x;
        this.getLine((i + 1) % this.getNumLines()).getFirst().y += y;
        this.getLine(i).getSecond().x += x;
        this.getLine(i).getSecond().y += y;
    }
    this.moveC1 = function(x, y, i){
        this.getLine(i).getC1().x += x;
        this.getLine(i).getC1().y += y;
    }
    this.moveC2 = function(x, y, i){
        this.getLine(i).getC2().x += x;
        this.getLine(i).getC2().y += y;
    }

    // Does get line work in all cases? When drawing the rectangle,
    // it might return undefined in in the y coordinate,
    // even though pointList appeared to be correct
    this.getPoint = function(i){ return this.pointList[i]; }
    this.getNumPoints = function(){ return this.numPoints; }
    this.incrementNumPoints = function(){ this.numPoints++; }

    this.getLine = function(i){ return this.lineList[i]; }
    this.getNumLines = function(){ return this.numLines; }

    // this.draw = new objDrawer(context);
}
