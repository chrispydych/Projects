var contextSingleton = function(context){
    this.ctx = context;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = globalStateData.lineThickness * globalStateData.getZoomDeg();

    this.getContext = function(){
        return this.ctx;
    }

    this.drawLine = function(line){
        this.ctx.beginPath();
        this.ctx.moveTo(
                        line.getFirst().x *
                            globalStateData.getZoomDeg() +
                            globalStateData.getXOffset(),
                        line.getFirst().y *
                            globalStateData.getZoomDeg() +
                            globalStateData.getYOffset()
                    );
        if(line.isCurve){
            this.ctx.bezierCurveTo(
                line.getC2().x,
                line.getC2().y,
                line.getC1().x,
                line.getC1().y,
                line.getSecond().x,
                line.getSecond().y
            );

            // will fix this later for curves
                // this.ctx.rect(
                //     (line.getC1().x - (globalStateData.hitZone / 2)) *
                //     globalStateData.getZoomDeg() +
                //     globalStateData.getXOffset(),
                //     (line.getC1().y - (globalStateData.hitZone / 2)) *
                //     globalStateData.getZoomDeg() +
                //     globalStateData.getXOffset(),
                //     globalStateData.hitZone,
                //     globalStateData.hitZone
                //             );
                // this.ctx.rect(
                //     (line.getC2().x - (globalStateData.hitZone / 2)) *
                //     globalStateData.getZoomDeg() +
                //     globalStateData.getXOffset(),
                //     (line.getC2().y - (globalStateData.hitZone / 2)) *
                //     globalStateData.getZoomDeg() +
                //     globalStateData.getXOffset(),
                //     globalStateData.hitZone,
                //     globalStateData.hitZone
                //             );
        }
        else{

            this.ctx.lineTo(
                        line.getSecond().x *
                            globalStateData.getZoomDeg() +
                            globalStateData.getXOffset(),
                        line.getSecond().y *
                            globalStateData.getZoomDeg() +
                            globalStateData.getYOffset()
                    );
            this.ctx.rect(
                            (line.getSecond().x - (globalStateData.hitZone / 2)) *
                            globalStateData.getZoomDeg() +
                            globalStateData.getXOffset(),
                            (line.getSecond().y - (globalStateData.hitZone / 2)) *
                            globalStateData.getZoomDeg() +
                            globalStateData.getYOffset(),
                            globalStateData.hitZone,
                            globalStateData.hitZone
                        );
        }
        this.ctx.stroke();
    }

    this.drawGridLine = function(line){
        this.ctx.beginPath();
        this.ctx.moveTo(
                        line.getFirst().x *
                            globalStateData.getZoomDeg(),
                        line.getFirst().y *
                            globalStateData.getZoomDeg()
                    );
        this.ctx.lineTo(
                    line.getSecond().x *
                        globalStateData.getZoomDeg(),
                    line.getSecond().y *
                        globalStateData.getZoomDeg()
                );
        this.ctx.stroke();
    }

    this.drawGrid = function(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        // var i = globalStateData.gridLength *
        //         globalStateData.getZoomDeg() +
        //         globalStateData.getXOffset();

        var i = globalStateData.gridLength *
                globalStateData.getZoomDeg();
        this.ctx.strokeStyle = "#AAAAAA";
        this.ctx.lineWidth = 1;

        // horizontal lines
        // every *2 is to make the grid fill the screen even when zooming out (or in, I don't know which
        // is which. The one that makes everything smaller)
        while(i < canvas.height*2) {
            this.drawGridLine(new lineObj(new pointObj(0, i),
                                        new pointObj(canvas.width*2, i)));
            i += globalStateData.gridLength * globalStateData.getZoomDeg();
        }
        // i = globalStateData.gridLength *
        //     globalStateData.getZoomDeg() +
        //     globalStateData.getXOffset();

        i = globalStateData.gridLength *
            globalStateData.getZoomDeg();

        // vertical lines
        while(i < canvas.width*2) {
            this.drawGridLine(new lineObj(new pointObj(i, 0),
                                        new pointObj(i, canvas.width*2)));
            i += globalStateData.gridLength * globalStateData.getZoomDeg();
        }

        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = globalStateData.lineThickness * globalStateData.getZoomDeg();
    }

    this.addLabel = function(shape){
        var coords = shape.metadata.getCentroid();

        //alert("x, y in addLabel: " + x + " " + y);
        this.ctx.font = globalStateData.labelFontSize + "px Arial";
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(shape.metadata.getName(),
                            coords.x *
                            globalStateData.getZoomDeg() +
                            globalStateData.getXOffset(),
                            coords.y *
                            globalStateData.getZoomDeg() +
                            globalStateData.getYOffset()
                        );
    }

    this.addColor = function(shape){
        this.ctx.beginPath();
        this.ctx.arc(
                        shape.metadata.getCentroid().x *
                        globalStateData.getZoomDeg() +
                        globalStateData.getXOffset(),
                        shape.metadata.getCentroid().y *
                        globalStateData.getZoomDeg() + 15 +
                        globalStateData.getYOffset(),
                        10 * globalStateData.getZoomDeg(),
                        0, 2 * Math.PI
                    );

        this.ctx.fillStyle = shape.metadata.getColor();
        this.ctx.fill();
    }
}
