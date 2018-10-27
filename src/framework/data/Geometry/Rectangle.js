define(["polygon", "vertex", "utils"], function(Polygon, Vertex, utils) {

    Rectangle.prototype = Object.create(Polygon.prototype);
    Rectangle.prototype.constructor = Rectangle;
    function Rectangle(width, height) {
        width = width || 0;
        height = height || 0;
        utils.validator.validateInstanceType(this, width, "number");
        utils.validator.validateInstanceType(this, height, "number");
        Polygon.call(this, [
            // follow CAST pattern (account for canvas y-axis inversion)
            new Vertex(width / 2, -height / 2),
            new Vertex(-width / 2, -height / 2),
            new Vertex(-width / 2, height / 2),
            new Vertex(width / 2, height / 2),
        ]);
    }
    Rectangle.prototype.getWidth = function() {
        return this.vertices ? this.vertices[0].x - this.vertices[1].x : 0;
    };
    Rectangle.prototype.getHeight = function() {
        return this.vertices ? this.vertices[3].y - this.vertices[0].y : 0;
    };
    Rectangle.prototype.clone = function() {
        return new Rectangle(this.getWidth(), this.getHeight());
    };

    return Rectangle;
});
