define(["component"],
function(Component) {

	MouseComponent.prototype = Object.create(Component.prototype);
	MouseComponent.prototype.constructor = MouseComponent;
	function MouseComponent(mouseHandle) {
        // inherits from
        Component.call(this, mouseHandle);
        // events
        this.registerEvents(
            "onmousemove",
            "onmousedown",
            "onmouseup",
            "onclick",
        );
        // inject event callbacks into handle
        this.__attachEventTriggerToHandleMethod("setData", "onmousemove");
        this.__attachEventTriggerToHandleMethod("mousedown", "onmousedown");
        this.__attachEventTriggerToHandleMethod("mouseup", "onmouseup");
        this.__attachEventTriggerToHandleMethod("click", "onclick");
    }

 return MouseComponent;
});
