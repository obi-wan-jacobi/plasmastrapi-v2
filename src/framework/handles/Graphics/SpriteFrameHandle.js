//define(['data-handle'],
//function (DataHandle) {

//    SpriteFrameHandle.prototype = Object.create(DataHandle.prototype);
//    SpriteFrameHandle.prototype.constructor = SpriteFrameHandle;
//    function SpriteFrameHandle(image, imageDisplaySettings) {
//        DataHandle.call(this, image, imageDisplaySettings);
//    };
//    SpriteFrameHandle.prototype.draw = function (ctx, position, orientation) {
//        var displaySettings = this.__displaySettings;
//        ctx.save();
//        ctx.translate(position.x, position.y);
//        ctx.rotate(orientation);
//        // image is translated about its centre rather than its top left corner
//        // https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/drawImage
//        ctx.drawImage(
//            this.image,
//            displaySettings.sourceX,
//            displaySettings.sourceY,
//            displaySettings.sourceWidth,
//            displaySettings.sourceHeight,
//            -displaySettings.destWidth / 2,
//            -displaySettings.destHeight / 2,
//            displaySettings.destWidth,
//            displaySettings.destHeight
//        );
//        ctx.restore();
//    };

//    return SpriteFrameHandle;
//});
