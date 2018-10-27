define(["primitive", "vertex", "validator"],
function(Primitive, Vertex, validator) {

    Polygon.prototype = Object.create(Primitive.prototype);
    Polygon.prototype.constructor = Polygon;
    function Polygon(vertices) {
        Primitive.call(this);
        if (vertices) {
            validator.validateInstanceType(this, vertices, "vertex");
        }
        this.vertices = vertices || [];
    }
    Polygon.prototype.clone = function() {
        var clonedVertices = [];
        for (var i = 0, L = this.vertices.length; i < L; i++) {
            clonedVertices.push(new Vertex(this.vertices[i].x, this.vertices[i].y));
        }
        return new Polygon(clonedVertices);
    };

    return Polygon;
});
