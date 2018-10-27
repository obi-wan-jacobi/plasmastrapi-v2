define(["display-settings"], function(DisplaySettings) {

    PoseDisplaySettings.prototype = Object.create(DisplaySettings.prototype);
    PoseDisplaySettings.prototype.constructor = PoseDisplaySettings;
    function PoseDisplaySettings(displayLayer) {
        DisplaySettings.call(this, displayLayer || "none");
    }

    return PoseDisplaySettings;
});
