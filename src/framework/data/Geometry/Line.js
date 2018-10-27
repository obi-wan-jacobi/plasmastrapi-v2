define(["primitive", "validator"],
function(Primitive, validator) {

    Line.prototype = Object.create(Primitive.prototype);
    Line.prototype.constructor = Line;
    function Line(tailVertex, headVertex) {
        Primitive.call(this);
        validator.validateInstanceType(this, tailVertex, "vertex");
        validator.validateInstanceType(this, headVertex, "vertex");
        this.tailVertex = tailVertex;
        this.headVertex = headVertex;
    }

    return Line;
});
