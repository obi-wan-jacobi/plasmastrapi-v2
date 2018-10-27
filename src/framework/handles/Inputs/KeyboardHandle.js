define(["data-handle", "dictionary"],
function(DataHandle, Dictionary) {

    KeyboardHandle.prototype = Object.create(DataHandle.prototype);
    KeyboardHandle.prototype.constructor = KeyboardHandle;
    function KeyboardHandle() {
        DataHandle.call(this);
        // private variables
        this.__keyString = null;
        this.__keysDown = [];
        this.__keyMapper = new Dictionary("string");
        this.__keyMapper.add(13, "enter");
        this.__keyMapper.add(16, "shift");
        this.__keyMapper.add(17, "ctrl");
        this.__keyMapper.add(27, "escape");
    }
    KeyboardHandle.prototype.setData = function() { };
    KeyboardHandle.prototype.setDisplaySettings = function() { };
    // public prototypal variables
    Object.defineProperties(KeyboardHandle.prototype, {
        "isShiftKeyDown": {
            get: function() {
                return this.isKeyDown("shift");
            },
        },
        "isCtrlKeyDown": {
            get: function() {
                return this.isKeyDown("ctrl");
            },
        },
    });
    // public methods
    KeyboardHandle.prototype.getKeyString = function() {
        return this.__keyString;
    };
    KeyboardHandle.prototype.isKeyDown = function(keyChar) {
        return this.__keysDown.indexOf(keyChar) > -1 ? true : false;
    };
    KeyboardHandle.prototype.keydown = function(keyboardEvent) {
        var keyString = this.__keyMapper.get(keyboardEvent.keyCode);
        if (keyString) {
            this.__keysDown.push(keyString);
            this.__keyString = keyString;
        } else {
            this.__keysDown.push(keyboardEvent.key);
            this.__keyString = keyboardEvent.key;
        }
    };
    KeyboardHandle.prototype.keyup = function(keyboardEvent) {
        var idx = this.__keysDown.indexOf(keyboardEvent.key);
        this.__keyString = this.__keysDown.splice(idx, 1)[0];
    };

    return KeyboardHandle;
});
