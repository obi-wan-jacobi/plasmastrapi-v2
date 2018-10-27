define(["mixin", "validator"],
function(Mixin, validator) {

    Pausable.prototype = Object.create(Mixin.prototype);
    Pausable.prototype.constructor = Pausable;
    function Pausable() {
        Mixin.call(this, "pausable");
        Mixin.prototype.defineProperty.call(this, "isPaused", false);
        this.registerEvents(
            "onframe",
            "onpause",
            "onunpause",
        );
    }
    Pausable.prototype.loopOnce = function(deltaMs) {
        if (this.isLoaded && !this.isPaused) {
            this.emit("onframe", deltaMs);
            return true;
        }
        return false;
    };
    Pausable.prototype.pause = function() {
        if (this.__isPaused) {
            return;
        }
        this.__isPaused = true;
        this.emit("onpause");
    };
    Pausable.prototype.unpause = function() {
        if (!this.__isPaused) {
            return;
        }
        this.__isPaused = false;
        this.emit("onunpause");
    };
    Pausable.prototype.restart = function() {
        this.pause();
        this.unpause();
        if (this.isLoadable) {
            this.reload();
        }
    };

    return Pausable;
});
