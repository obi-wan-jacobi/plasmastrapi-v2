define(["emitter", "dictionary", "loadable", "destructible", "position", "utils"],
function(Emitter, Dictionary, Loadable, Destructible, Position, utils) {

    Entity.prototype = Object.create(Emitter.prototype);
    Entity.prototype.constructor = Entity;
    function Entity() {
        // inherits from
        Emitter.call(this);
        // private variables
        this.__parent = null;
        this.__components = new Dictionary("component");
        this.__dependencies = new Dictionary("entity");
        // apply mixins
        Loadable.call(this);
        Destructible.call(this);
    }
    // private methods
    Entity.prototype.__oninit = function() { };
    Entity.prototype.__onload = function() { };
    Entity.prototype.__onunload = function() { };
    Entity.prototype.__ondestroy = function() {
        this.__dependencies.forEach(function(dependency) {
            this.removeDependency(dependency);
        }, this);
    };
    // public methods
    Entity.prototype.purgeEventListener = function(subscriber) {
        utils.validator.validateObject(this, subscriber);
        if (subscriber === this.__parent) {
            return;
        }
        var moduleName = utils.modules.getModuleName(subscriber);
        if (moduleName.includes("component")) {
            if (subscriber === this.getComponent(moduleName)) {
                return;
            }
        }
        var isSubscriberADependency = this.__dependencies.forEach(function(dependency) {
            if (subscriber === dependency) {
                return true;
            }
        }, this);
        if (isSubscriberADependency) {
            return;
        }
        for (var event in this.__events) {
            if (this.__events.hasOwnProperty(event)) {
                this.__events[event].remove(subscriber);
            }
        }
    };
    Entity.prototype.addDependency = function(dependency) {
        utils.validator.validateInstanceType(this, dependency, "entity");
        this.__dependencies.add(dependency, dependency);
        // wire-up event subscriptions
        dependency.addEventListener("onload", this, this.load);
        dependency.addEventListener("onunload", this, this.unload);
        dependency.addEventListener("ondestroy", this, this.destroy);
    };
    Entity.prototype.removeDependency = function(dependency) {
        dependency = this.__dependencies.get(dependency);
        if (!dependency) {
            utils.validator.throw(this, "removeDependency", `${this.constructor.name} does not contain a ${dependency.constructor.name} dependency`);
        }
        // unhook event subscriptions
        dependency.removeEventListener("onload", this, this.load);
        dependency.removeEventListener("onunload", this, this.unload);
        dependency.removeEventListener("ondestroy", this, this.destroy);
    };
    Entity.prototype.setParent = function(parent) {
        if (this.__parent) {
            utils.validator.throw(this, "setParent", "This entity already has a parent");
        }
        this.addDependency(parent);
        this.__parent = parent;
    };
    Entity.prototype.addComponent = function(component) {
        this.__components.add(utils.modules.getModuleName(component), component);
        component.setEntity(this);
        if (this.isLoaded) {
            component.load();
        }
    };
    Entity.prototype.getComponent = function(componentString) {
        return this.__components.get(componentString);
    };
    Entity.prototype.hasComponent = function(componentString) {
        return this.getComponent(componentString) ? true : false;
    };
    Entity.prototype.forEachComponent = function(fn, /* optional */ caller) {
        return this.__components.forEach(fn, caller);
    };
    Entity.prototype.follow = function(entityToFollow, positionOffset) {
        var poseComponentToFollow = entityToFollow.getComponent("pose-component");
        var poseComponent = this.getComponent("pose-component");
        poseComponentToFollow.addEventListener("onpositionchange", this, function() {
            var position = poseComponentToFollow.getHandle().getPosition();
            var orientation = poseComponentToFollow.getHandle().getOrientation();
            var templateX = positionOffset.x;
            var templateY = positionOffset.y;
            var x = templateX * Math.cos(orientation) - templateY * Math.sin(orientation) + position.x;
            var y = templateX * Math.sin(orientation) + templateY * Math.cos(orientation) + position.y;
            poseComponent.getHandle().setPosition(new Position(x, y));
        });
        poseComponentToFollow.addEventListener("onorientationchange", poseComponent.getHandle(), function(newOrientation) {
            poseComponent.getHandle().setOrientation(newOrientation);
        });
    };

    return Entity;
});
