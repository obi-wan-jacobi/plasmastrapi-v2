define(["data-handle", "position", "validator"],
function(DataHandle, Position, validator) {

    MouseHandle.prototype = Object.create(DataHandle.prototype);
    MouseHandle.prototype.constructor = MouseHandle;
    function MouseHandle() {
        DataHandle.call(this, new Position());
        // private variables
        this.__isMouseDown = false;
    }
    // public prototypal variables
    Object.defineProperties(MouseHandle.prototype, {
        "isMouseDown": {
            get: function() {
                return this.__isMouseDown;
            },
        },
    });
    // public methods
    MouseHandle.prototype.setData = function(data) {
        validator.validateInstanceType(this, data, "position");
        this.__data = data;
    };
    MouseHandle.prototype.mousemove = function(position) {
        this.setData(position);
    };
    MouseHandle.prototype.mousedown = function() {
        this.__isMouseDown = true;
    };
    MouseHandle.prototype.mouseup = function() {
        this.__isMouseDown = false;
    };
    MouseHandle.prototype.click = function() {
    };

    return MouseHandle;
});
