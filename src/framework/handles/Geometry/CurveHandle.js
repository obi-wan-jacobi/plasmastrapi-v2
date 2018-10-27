define(["data-handle", "vertex", "utils"],
function(DataHandle, Vertex, utils) {

    CurveHandle.prototype = Object.create(DataHandle.prototype);
    CurveHandle.prototype.constructor = CurveHandle;
    function CurveHandle(curve, displaySettings) {
        DataHandle.call(this, curve, displaySettings);
    }
    CurveHandle.prototype.lineTo = function(position) {
        utils.validator.validateInstanceType(this, position, "position");
        this.__data.vertices.push(new Vertex(position.x, position.y));
    };
    CurveHandle.prototype.draw = function(ctx) {
        var displaySettings = this.__displaySettings;
        var vertices = this.__data.vertices;
        if (vertices.length < 2) {
            return;
        }
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (var i = 1, L = vertices.length; i < L; i++) {
            ctx.lineTo(vertices[i].x, vertices[i].y);
        }
        ctx.strokeStyle = displaySettings.strokeStyle;
        ctx.lineWidth = displaySettings.lineWidth;
        ctx.stroke();
        ctx.restore();
    };

    return CurveHandle;
});
