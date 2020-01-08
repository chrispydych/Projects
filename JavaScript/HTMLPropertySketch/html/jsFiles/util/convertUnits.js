//
// export class UnitConvert {
//
//     constructor(_pixPerVert, _feetPerVert){
//         this.pixPerVert = _pixPerVert;
//         this.feetPerVert = _feetPerVert;
//     }
//
//     pixToVert(pixCount) {
//         return pixCount / getPixPerVert();
//     }
//     setPixPerVert(newScale) {
//         this.pixPerVert = newScale;
//     }
//     getPixPerVert() {
//         return this.pixPerVert;
//     }
//
//     vertToFeet(vertCount) {
//         return vertCount * getFeetPerVert();
//     }
//     setFeetPerVert(newScale) {
//         this.feetPerVert = newScale;
//     }
//     getFeetPerVert() {
//         return this.feetPerVert;
//     }
// }

function pixelsSquaredToGrid(numPixels, gridSide){
    return numPixels / (gridSide * gridSide);
}

function squareGridToUnits(numSquares, ratio){
    return numSquares * ratio;
}

function rgbToHex(r, g, b) {
    return "#" + ((r << 16) | (g << 8) | b).toString(16);
}
