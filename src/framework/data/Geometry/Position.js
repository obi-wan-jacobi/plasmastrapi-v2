define(["pose", "validator"], function(Pose, validator) {

    Position.prototype = Object.create(Pose.prototype);
    Position.prototype.constructor = Position;
    function Position(x, y) {
        Pose.call(this, x, y);
    }

    return Position;
});
