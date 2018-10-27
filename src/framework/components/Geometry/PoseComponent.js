define(["component"],
function(Component) {

	PoseComponent.prototype = Object.create(Component.prototype);
	PoseComponent.prototype.constructor = PoseComponent;
	function PoseComponent(poseHandle) {
        // inherits from
        Component.call(this, poseHandle);
	    // events
		      this.registerEvents(
            "onpositionchange",
            "onorientationchange",
        );
        // inject event callbacks into handle
        this.__attachEventTriggerToHandleMethod("setPosition", "onpositionchange");
        this.__attachEventTriggerToHandleMethod("setOrientation", "onorientationchange");
	}

 return PoseComponent;
});
