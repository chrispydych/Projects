
function drawShapeObjs(){
    ctxHolder.drawGrid();
    var currentShape;

    for (let i = 0; i < globalStateData.getNumShapes(); i++){
        currentShape = globalStateData.getShape(i);
        
        for(let j = 0; j < currentShape.getNumLines(); j++){
            var currentLine = currentShape.lineList[j];
            // alert("drawing line")
            ctxHolder.drawLine(currentLine);
            //alert("after line?")
        }

        ctxHolder.addLabel(currentShape);
        ctxHolder.addColor(currentShape);
    }
    if(!(globalStateData.getCurrentWorkingShape() == null)){
        currentShape = globalStateData.getCurrentWorkingShape();

        for(let j = 0; j < currentShape.getNumLines(); j++){
            var currentLine = currentShape.lineList[j];
            ctxHolder.drawLine(currentLine);
        }
    }
}//replaces drawAllShapes

function completeShapeObj(label){
	// currentShape = shapeObjArray[shapeIndex];
	var currentShape = globalStateData.getCurrentWorkingShape();
	var lastLine = new lineObj(
		currentShape.pointList[currentShape.getNumPoints()],
		currentShape.pointList[0],
		false
	)
	currentShape.addStraightLine(lastLine);
	currentShape.metadata.setName(label);
	globalStateData.addShape(currentShape);
}

function snapToGrid(x, offset){
	var temp = x % (globalStateData.gridLength * globalStateData.getZoomDeg());
	if(temp > ((globalStateData.gridLength / 2) * globalStateData.getZoomDeg())){
        return x + (globalStateData.gridLength * globalStateData.getZoomDeg()) - temp - (offset * globalStateData.getZoomDeg());
	}
	else{
		return x - temp - offset;
    }
}

// checks to see if a point is higher than highest, righter than rightest, etc. for auto zoom purposes
function checkIfAndSetMostestPoint(x, y) {
    // alert("inside check thing")
    if(y < globalStateData.getTopCoordinate()) {
        globalStateData.setTopCoordinate(y);
    }
    else if(y > globalStateData.getBottomCoordinate()) {
        globalStateData.setBottomCoordinate(y);
    }
    
    if(x > globalStateData.getRightmostCoordinate()) {
        globalStateData.setRightmostCoordinate(x);
    }
    else if(x < globalStateData.getLeftmostCoordinate()) {
        globalStateData.setLeftmostCoordinate(x);
    }
    //alert("Top: " + globalStateData.getTopCoordinate() + " Bottom: " + globalStateData.getBottomCoordinate() + " Right: " + globalStateData.getRightmostCoordinate() + " Left: " + globalStateData.getLeftmostCoordinate());
    // alert("end check thing")
}

//-----------------------------------------------------------------------

//
//
// function Create2DArray(rows) {
// 	var arr = [];
// 	for (var i=0;i<rows;i++) {
// 		arr[i] = [];
// 	}
// 	return arr;
// }
//
// function Create2DMetaArray(rows) {
// 	var arr = [];
// 	for (var i = 0; i < rows; i++) {
// 		arr[i] = new meta(0, false, "");
// 	}
// 	return arr;
// }
//
// /* connects the last point drawn to the first point of that shape
//    the default label is added when the shape is connected */
// // isCircle tells this if the shape is a circle which fixes both
// // completing the same and draws the label in the correct place
// function completeShape(nameString, isCircle) {
// 	ctx.strokeStyle = "#000000";
//     ctx.lineWidth = lineThickness * zoomDeg;
//     // this checks if it is legal to complete the shape
// 	if(pointCount > 2 || isCircle) {
//
//         // if we are automatically drawing the last line of the shape
//         if(!isCircle) {
//             ctx.moveTo(shapesArray[shapesCount][pointCount-1][0],
//                 shapesArray[shapesCount][pointCount-1][1]);
//             ctx.lineTo(shapesArray[shapesCount][0][0],
//                 shapesArray[shapesCount][0][1]);
//             }
//
//         if(nameString == null) {
//             nameString = "Shape";
//         }
//         metaArray[shapesCount].name = nameString + shapesCount;
//         addLabel(shapesCount, metaArray[shapesCount].name, isCircle)
//         ctx.stroke();
//         pointCount = 0;
//         shapesCount++;
// 	}
// }
//
//
//
//
// /* Find top left coordinate to place the label, prioritizing top over left
//    We can use a different method for attaching the label later on (such as
//    putting it in the center of the shape). I just don't know what will look
//    the best, so this is how it will be for now. */
// function findTopLeftCoordinate(shape) {
//     var i = 0;
//     var topLeft = i;
//     var x, y;
//     while(shapesArray[shape][i]) {
//         // if higher than topLeft, set new topLeft
//         if(shapesArray[shape][i][1] < shapesArray[shape][topLeft][1]) {
//             topLeft = i;
//         }
//         // if equally as high as topLeft, see which is more left
//         else if(shapesArray[shape][i][1] == shapesArray[shape][topLeft][1]) {
//             if(shapesArray[shape][i][0] < shapesArray[shape][topLeft][0]) {
//                 topLeft = i;
//             }
//         }
//         i++;
//     }
//
//     // hold x and y to save typing that long awful thing
//     x = shapesArray[shape][topLeft][0];
//     y = shapesArray[shape][topLeft][1];
//
//     /* Checks if the label will run off the screen. If not, return top left
//        coordinate. If so, return top left coordinate with adjustments */
//
//     // if y-coordinate is too high
//     if((y * zoomDeg) - (labelFontSize-5) <= 0) {
//       y = y + labelFontSize - 5;
//     }
//
//     /* if x-coordinate is too far right. the labelFontSize * 11 is an
//        approximation of how long the label will be. We can make it more
//        exact later on if needed. The 500 is how wide the canvas is */
//     //alert("x: " + x + " eq: " + ((x * zoomDeg) + 50));
//     if((x * zoomDeg) + 50 >= 500) {
//       x = x - 50;
//     }
//
//     return [x, y];
// }
