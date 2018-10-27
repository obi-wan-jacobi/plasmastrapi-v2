define(["data-handle", "pose", "position", "vertex", "utils"],
function(DataHandle, Pose, Position, Vertex, utils) {

    PoseHandle.prototype = Object.create(DataHandle.prototype);
    PoseHandle.prototype.constructor = PoseHandle;
    function PoseHandle(pose, displaySettings) {
        DataHandle.call(this, pose, displaySettings);
    }
    PoseHandle.prototype.setData = function(data) {
        // validate data for this handle
        var modulePrefix = utils.modules.getModulePrefix(this, "Handle");
        utils.validator.validateInstanceType(this, data, modulePrefix);
        if (this.__data) {
            if (!(this.__data.x == data.x) || !(this.__data.y == data.y)) {
                this.setPosition(new Position(data.x, data.y));
            }
            if (!(this.__data.a == data.a)) {
                this.setOrientation(data.a);
            }
        } else {
            this.setPosition(new Position(data.x, data.y));
            this.setOrientation(data.a);
        }
    };
    PoseHandle.prototype.getPosition = function() {
        return new Position(this.__data.x, this.__data.y);
    };
    PoseHandle.prototype.getPositionAsVertex = function() {
        return new Vertex(this.__data.x, this.__data.y);
    };
    PoseHandle.prototype.setPosition = function(newPosition) {
        if (!(newPosition instanceof Position)) {
            validator.throw(this, "position set", `${newPosition} is not an instance of ${Position.name}`);
        }
        this.__data = new Pose(newPosition.x, newPosition.y, this.__data ? this.__data.a : 0);
    };
    PoseHandle.prototype.getOrientation = function() {
        return this.__data.a;
    };
    PoseHandle.prototype.setOrientation = function(newOrientation) {
        this.__data = new Pose(this.__data.x, this.__data.y, newOrientation);
    };

    return PoseHandle;
});
