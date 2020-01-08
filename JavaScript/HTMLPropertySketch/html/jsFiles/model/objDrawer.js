var objDrawer = function(context){
	this.drawCTX = context;


	// draws a rectangle with specific dimensions
	this.drawRectangle = function(string){
		alert("objDrawRectangle")
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
	this.drawTriangle = function(string){
	    var [height, width] = string.split('x');
	    height = parseInt(height);
	    width = parseInt(width);
	    x = shapesArray[shapesCount][pointCount-1][0];
	    y = shapesArray[shapesCount][pointCount-1][1];
	    drawLine(x+(width/2), y+height);
	    drawLine(x-(width/2), y + height);
	    completeShape();
	    //drawLine()
	};

	// draws a circle
	this.drawCircle = function(string){
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
	};

	//draws a curve
	this.curveLine = function(string){
	    var [height, width, radius, startangle] = string.split('x');
	    height = parseInt(height);
	    width = parseInt(width);
	    radius = parseInt(radius);
	    startangle = parseInt(startangle);
	    //endangle = parseInt(endangle);
	    ctx.arc(height, width, radius, startangle, 180, Math.PI);
	    ctx.stroke();
	    completeShape();
	};

	// draws lines, obviously
	this.drawLine = function(x,y) {
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
	};
}
