define(["mixin", "validator"],
function(Mixin, validator) {

    Enableable.prototype = Object.create(Mixin.prototype);
    Enableable.prototype.constructor = Enableable;
    function Enableable() {
        Mixin.call(this, "enableable");
        Mixin.prototype.defineProperty.call(this, "isEnabled", true);
        this.registerEvents(
            "onenable",
            "ondisable",
        );
    }
    Enableable.prototype.__ondestroy = function() {
        this.disable();
    };
    Enableable.prototype.enable = function() {
        if (this.__isEnabled) {
            return;
        }
        this.__isEnabled = true;
        this.emit("onenable");
    };
    Enableable.prototype.disable = function() {
        if (!this.__isEnabled) {
            return;
        }
        this.__isEnabled = false;
        this.emit("ondisable");
    };

    return Enableable;
});
