define(["mixin"],
function(Mixin) {

    Drawable.prototype = Object.create(Mixin.prototype);
    Drawable.prototype.constructor = Drawable;
    function Drawable() {
        Mixin.call(this, "drawable", ["loadable"]);
        Mixin.prototype.defineProperty.call(this, "isVisible", false);
        this.registerEvents(
            "onshow",
            "onhide",
        );
    }
    // public methods
    Drawable.prototype.__onload = function() {
        this.show();
    };
    Drawable.prototype.__onunload = function() {
        this.hide();
    };
	   Drawable.prototype.show = function() {
	    if (this.__isVisible) {
            return;
        }
     this.__isVisible = true;
     this.emit("onshow");
	};
	   Drawable.prototype.hide = function() {
	    if (!this.__isVisible) {
            return;
        }
     this.__isVisible = false;
     this.emit("onhide");
    };
    Drawable.prototype.draw = function(ctx) {
        if (!this.__isVisible) {
            return;
        }
        var poseComponent = this.__entity.getComponent("pose-component");
        var position, orientation;
        if (poseComponent) {
            var poseHandle = poseComponent.getHandle();
            position = poseHandle.getPosition();
            orientation = poseHandle.getOrientation();
        }
        this.__handle.draw(ctx, position, orientation);
    };

	   return Drawable;
});
