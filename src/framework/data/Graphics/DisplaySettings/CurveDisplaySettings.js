define(["display-settings"], function(DisplaySettings) {

    CurveDisplaySettings.prototype = Object.create(DisplaySettings.prototype);
    CurveDisplaySettings.prototype.constructor = CurveDisplaySettings;
    function CurveDisplaySettings(displayLayer, strokeStyle, lineWidth) {
        DisplaySettings.call(this, displayLayer || "none");
        this.strokeStyle = strokeStyle || "grey";
        this.lineWidth = lineWidth || 1;
    }

    return CurveDisplaySettings;
});
