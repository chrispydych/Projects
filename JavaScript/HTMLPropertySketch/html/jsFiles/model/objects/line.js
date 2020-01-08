//This blob of code is creting the line, determining whether the line is a curved line
const lineObj = function(p1, p2, curve, c1, c2){
    this.ps = p1;
    this.pf = p2;
    this.isCurve = curve;
    // this.slope = null;
    // this.b = null;

    if(this.isCurve){
        this.control1 = c1;
        this.control2 = c2;

        this.inControlCircle1 = function(point){
            if(Math.abs(point.x - this.getC1().x) < globalStateData.hitZone &&
                Math.abs(point.y - this.getC1().y) < globalStateData.hitZone){
                    return true;
                }
            return false;
        }
        this.inControlCircle2 = function(point){
            if(Math.abs(point.x - this.getC2().x) < globalStateData.hitZone &&
                Math.abs(point.y - this.getC2().y) < globalStateData.hitZone){
                    return true;
                }
            return false;
        }
    }

    this.getFirst = function(){
        //alert(this.ps.x);
        return this.ps;
    }
    this.getSecond = function(){ return this.pf; }
    // this.getSlope = function(){ return this.slope; }
      //this finds the slope of the line to help get th perimeter, area
    this.getB = function(){ return this.b; }

    this.getC1 = function(){
        if(this.isCurve){
            return this.control1;
        }
    }
    this.getC2 = function(){
        if(this.isCurve){
            return this.control2;
        }
    }


    this.setBoundingRect = function(){
        if(this.getFirst().x <= this.getSecond().x){
            if(this.getFirst().y <= this.getSecond().x){
                return new rectObj(this.getFirst().x,
                                    this.getFirst().y,
                                    this.getSecond().x - this.getFirst().x,
                                    this.getSecond().y - this.getFirst().y
                                );
            }
            return new rectObj(this.getFirst().x,
                                this.getSecond().y,
                                this.getSecond().x - this.getFirst().x,
                                this.getFirst().y - this.getSecond().y
                            );
        }
        else{
            if(this.getFirst().y <= this.getSecond().x){
                return new rectObj(this.getSecond().x,
                                    this.getFirst().y,
                                    this.getFirst().x - this.getSecond().x,
                                    this.getSecond().y - this.getFirst().y)
            }
            return new rectObj(this.getSecond().x,
                                this.getSecond().y,
                                this.getFirst().x - this.getSecond().x,
                                this.getFirst().y - this.getSecond().y)
        }
    }
    this.boundingRect = this.setBoundingRect();
    this.getBoundingRect = function() { return this.boundingRect; }

    this.inCircle = function(point){
        if(Math.abs(point.x - this.getSecond().x) < globalStateData.hitZone &&
            Math.abs(point.y - this.getSecond().y) < globalStateData.hitZone){
                return true;
            }
        return false;
    }

    // this.setSlope = function() {
    //
    //     if(this.isCurve) { this.slope = null; }
    //
    //     var dx = this.getSecond().x - this.getFirst().x,
    //         dy = this.getSecond().y - this.getFirst().y;
    //
    //     this.slope = dy / dx;
    // }
    //
    // this.setB = function(){
    //     if(this.isCurve) { this.b = null; }
    //     this.b = this.getFirst().y + (this.getSlope() * this.getFirst().x * -1);
    // }
    //
    // this.setLineEqVars= function(){
    //     this.setSlope();
    //     this.setB();
    // }
}
