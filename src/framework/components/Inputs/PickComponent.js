define(["component", "validator"],
function(Component, validator) {

	PickComponent.prototype = Object.create(Component.prototype);
	PickComponent.prototype.constructor = PickComponent;
 function PickComponent() {
		// inherits from
        Component.call(this);
        // events
        this.registerEvents(
            "onpoke",
            "onpull",
            "onprod",
            "onpet",
            "onpick",
            "onmouseenter",
            "onhover",
            "onmouseleave",
            "onselect",
            "ondeselect",
        );
        // private variables
        this.__isPoked = false;
        this.__isProdded = false;
        this.__isHovered = false;
        this.__isSelected = false;
        this.__hoverPosition = null;
    }
    // private methods
 PickComponent.prototype.__onunload = function() {
        this.reset();
    };
 PickComponent.prototype.__ondisable = function() {
        this.reset();
    };
 PickComponent.prototype.__ondestroy = function() {
        this.mouseleave();
        this.deselect();
    };
    // public prototypal variables
 Object.defineProperties(PickComponent.prototype, {
        "isPoked": {
            get: function() {
                return this.__isPoked;
            },
        },
        "isProdded": {
            get: function() {
                return this.__isProdded;
            },
        },
        "isHovered": {
            get: function() {
                return this.__isHovered;
            },
        },
        "isSelected": {
            get: function() {
                return this.__isSelected;
            },
        },
        "hoverPosition": {
            get: function() {
                return this.__hoverPosition;
            },
        },
    });
    // public methods
 PickComponent.prototype.reset = function() {
        this.__isPoked = false;
        this.__isProdded = false;
        this.unhover();
        this.deselect();
    };
    // mousedown
 PickComponent.prototype.poke = function() {
        if (this.__isHovered) {
            this.__isPoked = true;
            this.emit("onpoke", this);
        }
    };
 PickComponent.prototype.unpoke = function() {
        if (!this.__isHovered) {
            this.__isPoked = false;
        }
    };
    // mousemove with mousedown
 PickComponent.prototype.pull = function(position) {
        if (this.__isPoked) {
            this.emit("onpull");
        }
    };
    // mouseup after mousedown
 PickComponent.prototype.prod = function() {
        if (this.__isPoked) {
            this.__isPoked = false;
            this.__isProdded = true;
            this.emit("onprod", this);
        }
    };
    // mouseup without mousedown
 PickComponent.prototype.pet = function() {
        if (this.__isHovered) {
            this.emit("onpet", this);
        }
    };
    // click after mouseup with mousedown
 PickComponent.prototype.pick = function() {
        if (this.__isHovered && this.__isProdded) {
            this.__isProdded = false;
            this.emit("onpick", this);
        }
    };
 PickComponent.prototype.mouseenter = function() {
        this.__isHovered = true;
        this.emit("onmouseenter", this);
    };
 PickComponent.prototype.hover = function(position) {
        this.__hoverPosition = position;
        if (!this.__isHovered) {
            this.mouseenter();
        }
        if (this.__isPoked) {
            this.pull();
        }
        this.emit("onhover", this);
    };
 PickComponent.prototype.unhover = function() {
        if (this.__isHovered) {
            this.mouseleave();
        }
        this.__hoverPosition = null;
    };
 PickComponent.prototype.mouseleave = function() {
        this.__isHovered = false;
        this.__hoverPosition = null;
        this.emit("onmouseleave", this);
    };
 PickComponent.prototype.select = function() {
        this.__isSelected = true;
        this.emit("onselect", this);
    };
 PickComponent.prototype.deselect = function() {
        this.__isSelected = false;
        this.emit("ondeselect", this);
    };

	return PickComponent;
});
