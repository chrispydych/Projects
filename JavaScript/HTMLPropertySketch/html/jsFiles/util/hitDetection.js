function inBoundingRect(line, point){
    var bRect = line.getBoundingRect();

    if(point.x < (bRect.x - globalStateData.hitZone) || point.y < (bRect.y - globalStateData.hitZone)) { return false; }
    if((point.x > (bRect.x + bRect.w + globalStateData.hitZone)) || (point.y < (bRect.y + bRect.h + globalStateData.hitZone))) { return false; }

    console.log(
        bRect.x + ", " +
        bRect.y + ", " +
        bRect.w + ", " +
        bRect.h + "; " +
        point.x + ", " +
        point.y + "; " +
        line.getFirst().x + ", " +
        line.getFirst().y + "; " +
        line.getSecond().x + ", " +
        line.getSecond().y
    );
    return true;
}

function onLine(line, point){
    var expectedY = line.getSlope() * point.x + line.getB();

    if(Math.abs(expectedY - point.y) < globalStateData.hitZone){
        return true;
    }
    return false;
}

function inCircle(line, point){
    //this figures out if youre in the circle at the endpoint of the line
}

function getRandomColor() {
    var letters = '0123456789abcdef';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function isBackground(pixelData){
    if(
            ((pixelData[0] == 0) &&
            (pixelData[1] == 0) &&
            (pixelData[2] == 0) &&
            (pixelData[3] == 0) )
        ||
            ((pixelData[0] == 171) &&
            (pixelData[1] == 171) &&
            (pixelData[2] == 171) &&
            (pixelData[3] == 127))
        ){
        return true;
    }
    return false;
}
