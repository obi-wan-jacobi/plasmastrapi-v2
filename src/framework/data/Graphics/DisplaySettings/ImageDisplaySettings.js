define(["display-settings"], function(DisplaySettings) {

    ImageDisplaySettings.prototype = Object.create(DisplaySettings.prototype);
    ImageDisplaySettings.prototype.constructor = ImageDisplaySettings;
    function ImageDisplaySettings(displayLayer, sourceX, sourceY, sourceWidth, sourceHeight, destWidth, destHeight) {
        DisplaySettings.call(this, displayLayer);
        this.sourceX = sourceX || null;
        this.sourceY = sourceY || null;
        this.sourceWidth = sourceWidth || 0;
        this.sourceHeight = sourceHeight || 0;
        this.destWidth = destWidth || 0;
        this.destHeight = destHeight || 0;
    }

    return ImageDisplaySettings;
});
