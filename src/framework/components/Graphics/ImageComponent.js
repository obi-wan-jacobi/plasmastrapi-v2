define(["component"],
function(Component) {

	ImageComponent.prototype = Object.create(Component.prototype);
	ImageComponent.prototype.constructor = ImageComponent;
 function ImageComponent(imageHandle) {
        // inherits from
        Component.call(this, imageHandle);
    }

	return ImageComponent;
});
