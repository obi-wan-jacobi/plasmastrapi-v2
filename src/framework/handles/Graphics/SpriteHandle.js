//define(['data-handle'],
//function (DataHandle) {

//    SpriteHandle.prototype = Object.create(DataHandle.prototype);
//    SpriteHandle.prototype.constructor = SpriteHandle;
//    function SpriteHandle(spriteFrameHandles) {
//        DataHandle.call(this, spriteFrameHandles);
//        this.__currentFrameIndex = 0;
//    };
//    SpriteHandle.prototype.setFrame = function (frameNumber) {
//        if (frameNumber < 0) {
//            this.__currentFrameIndex = this.__data.length - 1;
//        } else if (frameNumber < this.__data.length) {
//            this.__currentFrameIndex = frameNumber;
//        } else if (frameNumber >= this.__data.length) {
//            this.__currentFrameIndex = 0;
//        }
//    };
//    SpriteHandle.prototype.nextFrame = function () {
//        this.setFrame(this.__currentFrameIndex + 1);
//    };
//    SpriteHandle.prototype.previousFrame = function () {
//        this.setFrame(this.__currentFrameIndex - 1);
//    };
//    SpriteHandle.prototype.draw = function (ctx, position, orientation) {
//        this.__data[this.__currentFrameIndex].draw(ctx, position, orientation);
//    };

//    return SpriteHandle;
//});
