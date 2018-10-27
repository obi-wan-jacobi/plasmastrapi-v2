define(["component"],
function(Component) {

        LabelComponent.prototype = Object.create(Component.prototype);
        LabelComponent.prototype.constructor = LabelComponent;
        function LabelComponent(textHandle) {
            // inherits from
            Component.call(this, textHandle);
        }

        return LabelComponent;
    });
