function drawRectObj(string){
    var [width, height] = string.split('x');
    width = parseInt(width);
    height = parseInt(height);
    //alert("Height: " + height + " width " + width)
    var startPoint = globalStateData.getCommonShapeStartPoint();

    var newRect = new shapeObj(startPoint);
    // alert("Start point: " + JSON.stringify(startPoint))
    // drawline(startPoint.x + width, startPoint.y);
    // drawline(startPoint.x + width, startPoint.y + height);
    // drawline(startPoint.x, startPoint.y + height);
    newRect.addStraightLine(new pointObj(startPoint.x + width, startPoint.y));
    newRect.addStraightLine(new pointObj(startPoint.x + width, startPoint.y + height));
    newRect.addStraightLine(new pointObj(startPoint.x, startPoint.y + height));
    //newRect.addStraightLine(new pointObj(startPoint.x, startPoint.y));
    newRect.addLastLine();

    globalStateData.addShape(newRect);
    // We need to redraw all the shapes in order for this be drawn immediately
    drawShapeObjs();
}

// draws a triangle with specific height and length
function drawTriObj(string){
    var [height, width] = string.split('x');
    height = parseInt(height);
    width = parseInt(width);
    var startPoint = globalStateData.getCommonShapeStartPoint();

    var newTri = new shapeObj(startPoint);
    newTri.addStraightLine(new pointObj(startPoint.x + width / 2, startPoint.y + height));
    newTri.addStraightLine(new pointObj(startPoint.x + width, startPoint.y));
    //newTri.addStraightLine(new pointObj(startPoint.x, startPoint.y));
    newTri.addLastLine();

    globalStateData.addShape(newTri);

    // We need to redraw all the shapes in order for this be drawn immediately
    drawShapeObjs();
}

// draws a circle
function drawCircleObj(string){
    // alert(string)
    var radius = parseInt(string);

    // alert(radius)
    var startPoint = globalStateData.getCommonShapeStartPoint();
    // alert("After get startpoint")
    // alert("Getpoint(0): " + getPoint(0))
    //alert("startpoint" + JSON.stringify(startPoint))
    // alert("After state start point")
    var newCirc = new shapeObj(startPoint);
    newCirc.addCurvedLine(
        new pointObj(radius * 2, startPoint.y),
        new pointObj(startPoint.x, startPoint.y + radius),
        new pointObj(startPoint.x + (radius * 2), startPoint.y + radius)
    );
    newCirc.addCurvedLine(
        new pointObj(radius * 2, startPoint.y),
        new pointObj(startPoint.x, startPoint.y - radius),
        new pointObj(startPoint.x + (radius * 2), startPoint.y - radius)
    );

    globalStateData.addShape(newCirc);

    // We need to redraw all the shapes in order for this be drawn immediately
    drawShapeObjs();

}

function parse(vectorString){
    var startingPoint = false;
    // for loading in correct beginning position
    indexOfColon = vectorString.indexOf(':');
    if(indexOfColon != -1) {
        startingPoint = true;
        var [first, vectorString] = vectorString.split(':');
        var [first, second] = first.split(',');
    }
    //vectorString = vectorString.substring(vectorString.indexOf(':')+1);
    //alert(first + "\n" + second + "\n" + vectorString);
    var parsedShapes = vectorString.split(';');
    //alert(parsedShapes.length);
    for(let i = 0; i < parsedShapes.length; i++){

        var singleString = parsedShapes[i].split(',');

        //alert(singleString);

        var curCoords;
        if(startingPoint) {
            curCoords = [first, second];
        }
        else {
            curCoords = shapesArray[shapesCount][pointCount - 1];
        }

        var x = curCoords[0];
        var y = curCoords[1];
        //alert("curCoords " + curCoords[0] + " " + curCoords[1]);
        for(let j = 0; j < singleString.length; j++){
            var cmd = singleString[j];

            if(j != 0) {
                curCoords = shapesArray[shapesCount][pointCount - 1];

                x = curCoords[0];
                y = curCoords[1];
            }
            //alert("curCoords " + x + " " + y);

            //alert(cmd + " " + cmd.charAt(0) + " " + cmd.charAt(1));

            var dist = (parseInt(cmd.slice(1, cmd.length)) * 50) * zoomDeg;

            //alert(dist);

            //alert("first " + first + " second " + second);
            ctx.moveTo(first, second);

            switch (cmd.charAt(0)) {
                case 'u' :
                case 'U' :
                    drawLine(x, (y - dist));
                    break;
                case 'd' :
                case 'D' :
                    drawLine(x, (y + dist));
                    break;
                case 'l' :
                case 'L' :
                    drawLine((x - dist), y);
                    break;
                case 'r' :
                case 'R' :
                    drawLine((x + dist), y);
                    break;
                default:
                    //alert("You done goofed");
            }
        }
    }
}


function saveModel(){
    var format = "<!>";
    $("input").each(function() {
        if ($(this).hasClass("save-radio")) {
            if (this.checked) {
                format = this.getAttribute("value");
            }
        }
    });
    if (format === "<!>"){
        alert("Please select a save type");
        return;
    }
    alert(format);
}
