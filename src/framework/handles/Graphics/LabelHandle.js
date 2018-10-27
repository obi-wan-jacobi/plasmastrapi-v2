define(["data-handle", "validator"],
function(DataHandle, validator) {

    LabelHandle.prototype = Object.create(DataHandle.prototype);
    LabelHandle.prototype.constructor = LabelHandle;
    function LabelHandle(text, textDisplaySettings) {
        DataHandle.call(this, text, textDisplaySettings);
    }
    LabelHandle.prototype.draw = function(ctx, position, orientation) {
        validator.validateInstanceType(this, position, "position");
        validator.validateInstanceType(this, orientation, "number");
        var textDisplaySettings = this.__displaySettings;
        var offset = textDisplaySettings.offset;
        ctx.save();
        ctx.font = `${textDisplaySettings.fontSize}px ${textDisplaySettings.font}`;
        ctx.fillStyle = textDisplaySettings.fillStyle;
        ctx.textAlign = textDisplaySettings.textAlign;
        ctx.fillText(this.__data.string, position.x + offset.x, position.y + offset.y);
        ctx.restore();
    };

    return LabelHandle;
});
