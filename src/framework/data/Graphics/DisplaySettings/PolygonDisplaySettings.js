define(["display-settings"], function(DisplaySettings) {

    // Definition:
    // https://en.wikipedia.org/wiki/Simple_polygon
    // https://en.wikipedia.org/wiki/Topological_conjugacy
    PolygonDisplaySettings.prototype = Object.create(DisplaySettings.prototype);
    PolygonDisplaySettings.prototype.constructor = PolygonDisplaySettings;
    function PolygonDisplaySettings(displayLayer, strokeStyle, fillStyle, lineWidth) {
        DisplaySettings.call(this, displayLayer || "none");
        this.strokeStyle = strokeStyle || "grey";
        this.fillStyle = fillStyle;
        this.lineWidth = lineWidth || 1;
    }

    return PolygonDisplaySettings;
});
