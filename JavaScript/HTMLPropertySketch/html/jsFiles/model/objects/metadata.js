//This sets vlues for the variables we will be using 
const meta = function(){

    this.totalArea = 0;
    this.perimeter = 0;
    this.name = null;
    this.color = null;
    this.centroid = null;

    this.setTotalArea = function(newArea) { this.totalArea = newArea; }
    this.setPerimeter = function(newPerim) { this.perimeter = newPerim; }
    this.setName = function(newName) { this.name = newName; }
    this.setColor = function(shapeColor) { this.color = shapeColor; }
    this.setCentroid = function(point) { this.centroid = point; }

    this.getTotalArea = function() { return this.totalArea; }
    this.getPerimeter = function() { return this.perimeter; }
    this.getName = function() { return this.name; }
    this.getColor = function() { return this.color; }
    this.getCentroid = function() { return this.centroid; }
}
