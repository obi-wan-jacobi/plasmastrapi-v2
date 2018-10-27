define(["primitive", "validator"], function(Primitive, validator) {

    Vertex.prototype = Object.create(Primitive.prototype);
    Vertex.prototype.constructor = Vertex;
    function Vertex(x, y) {
        Primitive.call(this);
        this.x = x === undefined || x === null ? 0 : x;
        this.y = y === undefined || y === null ? 0 : y;
        validator.validateInstanceType(this, this.x, "number");
        validator.validateInstanceType(this, this.y, "number");
    }

    return Vertex;
});
