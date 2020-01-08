
function drawGrid(){
    // clear the canvas first for zooming purposes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var i = gridLength * zoomDeg;
    ctx.strokeStyle = "#AAAAAA";
    ctx.lineWidth = lineThickness * zoomDeg;

    // horizontal lines
    while(i < canvas.height) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
        i = i + gridLength * zoomDeg;
    }
    i = gridLength * zoomDeg;

    // vertical lines
    while(i < canvas.width) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        i = i + gridLength * zoomDeg;
    }
}


// redraws all the shapes (right now for zooming purposes)
function drawAllShapes() {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = lineThickness * zoomDeg;
    var shape, point;
    // go through every shape
    for(shape = shapesCount; shape  >= 0; shape--) {
        // go through every point in that shape
        point = 0;
        alert(shapesArray[shapesCount].toString());
        while(shapesArray[x][y]) {
            alert(shapesArray[x]);
            ctx.beginPath();
            ctx.moveTo(shapesArray[x][y][0], shapesArray[x][y][1]);
            alert(shapesArray[x]);
            if(metaArray[shapesCount].hasCurves){
                var i = 0;
                while(metaArray[shapesCount].curveIndices[i]){
                    if(metaArray[shapesCount].curveIndices[i] == y){
                        curveLine(shapesArray[x][y][0], shapesArray[x][y][1]);
                    }
                }
            }
            else {
                ctx.lineTo(shapesArray[x][y+1][0], shapesArray[x][y+1][1]);
                ctx.stroke();
            }
            y++;
        }

        alert(metaArray[x].name);
    }
}

// draws a rectangle with specific dimensions
function drawRectangle(string){
    alert("drawRectangle")
    var [width, height] = string.split('x');
    width = parseInt(width);
    height = parseInt(height);
    x = shapesArray[shapesCount][pointCount-1][0];
    y = shapesArray[shapesCount][pointCount-1][1];
    drawLine(x+width, y);
    drawLine(x+width, y + height);
    drawLine(x, y + height);
    completeShape();
    //drawLine()
}

// draws a triangle with specific height and length
function drawTriangle(string){
    var [height, width] = string.split('x');
    height = parseInt(height);
    width = parseInt(width);
    x = shapesArray[shapesCount][pointCount-1][0];
    y = shapesArray[shapesCount][pointCount-1][1];
    drawLine(x+(width/2), y+height);
    drawLine(x-(width/2), y + height);
    completeShape();
    //drawLine()
}

// draws a circle
function drawCircle(string){
    var [height, width, radius, startangle, endangle] = string.split('x');
    height = parseInt(height);
    width = parseInt(width);
    radius = parseInt(radius);
    startangle = parseInt(startangle);
    endangle = parseInt(endangle);
    ctx.arc(height, width, radius, startangle, endangle, 2 * Math.PI);
    ctx.stroke();
    completeShape();
    //completeShape();
    //drawLine()
}

//draws a curve
function curveLine(string){
    var [height, width, radius, startangle] = string.split('x');
    height = parseInt(height);
    width = parseInt(width);
    radius = parseInt(radius);
    startangle = parseInt(startangle);
    //endangle = parseInt(endangle);
    ctx.arc(height, width, radius, startangle, 180, Math.PI);
    ctx.stroke();
    completeShape();
}

// draws lines, obviously
function drawLine(x,y) {
	shapesArray[shapesCount][pointCount] = [x, y];
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = lineThickness * zoomDeg;
	ctx.beginPath();

	if(pointCount > 0) {
		ctx.moveTo(shapesArray[shapesCount][pointCount-1][0],
			shapesArray[shapesCount][pointCount-1][1]);
		ctx.lineTo(x,y);
		ctx.stroke();
	}
	pointCount++;
}
