define(["mixin", "validator"],
function(Mixin, validator) {

    Loadable.prototype = Object.create(Mixin.prototype);
    Loadable.prototype.constructor = Loadable;
    function Loadable() {
        Mixin.call(this, "loadable");
        Mixin.prototype.defineProperty.call(this, "isLoaded", false);
        Mixin.prototype.defineProperty.call(this, "isInitialized", false);
        this.registerEvents(
            "oninit",
            "onload",
            "onunload",
        );
    }
    Loadable.prototype.__ondestroy = function() {
        this.unload();
    };
    Loadable.prototype.load = function() {
        if (this.__isLoaded) {
            return;
        }
        this.__isLoaded = true;
        if (!this.__isInitialized) {
            this.__isInitialized = true;
            this.emit("oninit");
        }
        this.emit("onload");
    };
    Loadable.prototype.unload = function() {
        if (!this.__isLoaded) {
            return;
        }
        this.__isLoaded = false;
        this.emit("onunload");
    };
    Loadable.prototype.reload = function() {
        this.unload();
        this.load();
    };

    return Loadable;
});
