define(["component"],
function(Component) {

	PolygonComponent.prototype = Object.create(Component.prototype);
	PolygonComponent.prototype.constructor = PolygonComponent;
 function PolygonComponent(polygonHandle) {
		// inherits from
        Component.call(this, polygonHandle);
        // dependencies
        this.__registerComponentDependencyOnLoad("pose-component", "onpositionchange", this, this.__translate);
        this.__registerComponentDependencyOnLoad("pose-component", "onorientationchange", this, this.__rotate);
    }
 PolygonComponent.prototype.__oninit = function() {
        var startingPosition = this.getEntity().getComponent("pose-component").getHandle().getPosition();
        this.__handle.translate(startingPosition);
    };
 PolygonComponent.prototype.__translate = function(poseHandle) {
        this.__handle.translate(poseHandle.getData());
    };
 PolygonComponent.prototype.__rotate = function(poseHandle) {
        this.__handle.rotate(poseHandle.getData().a);
    };

	return PolygonComponent;
});
