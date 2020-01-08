function calcAreaPerimCentroid(curShape){

    // var curShape = globalStateData.getShape(i);
    var sum = 0, perim = 0, xSum = 0, ySum = 0;

    for(let j = 0; j < curShape.getNumPoints(); j++){
        //
        // sum +=      shapesArray[i][(j) % pointCount][0] * shapesArray[i][(j + 1) % pointCount][1]
        //             - shapesArray[i][(j) % pointCount][1] * shapesArray[i][(j + 1) % pointCount][0];
        //
        // perim +=    hypotenuse(shapesArray[i][(j + 1) % pointCount][0] - shapesArray[i][(j) % pointCount][0],
        //                         shapesArray[i][(j + 1) % pointCount][1] - shapesArray[i][(j) % pointCount][1]);

        sum +=      curShape.getPoint(j % curShape.getNumPoints()).x *
                    curShape.getPoint((j + 1) % curShape.getNumPoints()).y -
                    curShape.getPoint(j % curShape.getNumPoints()).y *
                    curShape.getPoint((j + 1) % curShape.getNumPoints()).x;
        //This function gets the leftmost point and tracks the sum of all the points
        perim +=    hypotenuse(
                        curShape.getPoint((j + 1) % curShape.getNumPoints()).x -
                        curShape.getPoint(j % curShape.getNumPoints()).x,
                        curShape.getPoint((j + 1) % curShape.getNumPoints()).y -
                        curShape.getPoint(j % curShape.getNumPoints()).y
                    );
        //This function is to find the perimeter
        xSum +=     curShape.getPoint(j).x;
        ySum +=     curShape.getPoint(j).y;
    }

    sum = sum / 2;
    sum = Math.abs(sum);
    sum = pixelsSquaredToGrid(sum, globalStateData.gridLength * globalStateData.getZoomDeg());

    centroid = new pointObj(
                    Math.floor(xSum / curShape.getNumPoints()),
                    Math.floor(ySum / curShape.getNumPoints())
                );

    curShape.metadata.setTotalArea(Math.floor(sum));
    curShape.metadata.setPerimeter(Math.floor(perim));
    curShape.metadata.setCentroid(centroid);
    console.log(sum);
    console.log(perim);
    //alert("perimeter: " + perim + " area: " + sum);

    return curShape;
}

function hypotenuse(delX, delY){
    x2 = Math.pow(delX, 2);
    y2 = Math.pow(delY, 2);

    return Math.pow(x2 + y2, .5);
}
