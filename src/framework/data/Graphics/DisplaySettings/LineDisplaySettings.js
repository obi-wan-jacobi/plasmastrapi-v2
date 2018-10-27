define(["display-settings"], function(DisplaySettings) {

    LineDisplaySettings.prototype = Object.create(DisplaySettings.prototype);
    LineDisplaySettings.prototype.constructor = LineDisplaySettings;
    function LineDisplaySettings(displayLayer, strokeStyle, lineWidth) {
        DisplaySettings.call(this, displayLayer || "none");
        this.strokeStyle = strokeStyle || "grey";
        this.lineWidth = lineWidth || 1;
    }

    return LineDisplaySettings;
});
