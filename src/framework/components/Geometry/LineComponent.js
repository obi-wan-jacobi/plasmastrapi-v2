define(["component", "pose", "line-handle", "line", "validator"],
function(Component, Pose, LineHandle, Line, validator) {

	LineComponent.prototype = Object.create(Component.prototype);
	LineComponent.prototype.constructor = LineComponent;
	function LineComponent(tailPoseComponent, headPoseComponent, lineDisplaySettings) {
        validator.validateInstanceType(this, tailPoseComponent, "pose-component");
        validator.validateInstanceType(this, headPoseComponent, "pose-component");
        // private variables
        this.__tailPose = tailPoseComponent;
        this.__headPose = headPoseComponent;
        // inherits from
        Component.call(this, new LineHandle(new Line(this.__tailPose.getHandle().getPositionAsVertex(), this.__headPose.getHandle().getPositionAsVertex()), lineDisplaySettings));
        // events
		      this.registerEvents(
            "onpositionchange",
            "onorientationchange",
        );
        // dependencies
        this.__registerDependencyOnLoad(this.__tailPose, "onpositionchange", this, this.__updateTail);
        this.__registerDependencyOnLoad(this.__tailPose, "onorientationchange", this, this.__updateTail);
        this.__registerDependencyOnLoad(this.__headPose, "onpositionchange", this, this.__updateHead);
        this.__registerDependencyOnLoad(this.__headPose, "onorientationchange", this, this.__updateHead);
        // inject event callbacks into handle
        this.__attachEventTriggerToHandleMethod("setTailPosition", "onpositionchange");
        this.__attachEventTriggerToHandleMethod("setTailPosition", "onorientationchange");
        this.__attachEventTriggerToHandleMethod("setHeadPosition", "onpositionchange");
        this.__attachEventTriggerToHandleMethod("setHeadPosition", "onorientationchange");
	}
    // private methods
 LineComponent.prototype.__onload = function() {
        this.__updatePoseComponent();
        this.__updatePolygonComponent();
    };
 LineComponent.prototype.__updateTail = function(poseHandle) {
        this.__handle.setTailPosition(poseHandle.getPosition());
        this.__updatePoseComponent();
        this.__updatePolygonComponent();
    };
 LineComponent.prototype.__updateHead = function(poseHandle) {
        this.__handle.setHeadPosition(poseHandle.getPosition());
        this.__updatePoseComponent();
        this.__updatePolygonComponent();
    };
 LineComponent.prototype.__updatePoseComponent = function() {
        var poseComponent = this.__entity.getComponent("pose-component");
        if (poseComponent) {
            var position = this.__handle.getPosition();
            var orientation = this.__handle.getOrientation();
            poseComponent.setData(new Pose(position.x, position.y, orientation));
        }
    };
 LineComponent.prototype.__updatePolygonComponent = function() {
        var polygonComponent = this.__entity.getComponent("polygon-component");
        if (polygonComponent) {
            var polygon = this.__handle.getPolygon();
            polygonComponent.setData(polygon);
        }
    };

	return LineComponent;
});
