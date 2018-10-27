define(["emitter", "enableable", "destructible", "loadable", "drawable", "utils"],
function(Emitter, Enableable, Destructible, Loadable, Drawable, utils) {

    Component.prototype = Object.create(Emitter.prototype);
    Component.prototype.constructor = Component;
    function Component(/* optional */ dataHandle) {
        var modulePrefix = utils.modules.getModulePrefix(this, "Component");
        var HandleType = utils.modules.requireIfExists(`${modulePrefix}-handle`);
        if (dataHandle) {
            utils.validator.validateInstanceType(this, dataHandle, `${modulePrefix}-handle`);
        } else if (HandleType) {
            var primitive, displaySettings;
            var PrimitiveType = utils.modules.requireIfExists(`${modulePrefix}`);
            if (PrimitiveType) {
                primitive = new PrimitiveType();
            }
            var DisplaySettingsType = utils.modules.requireIfExists(`${modulePrefix}-display-settings`);
            if (DisplaySettingsType) {
                displaySettings = new DisplaySettingsType();
            }
            dataHandle = new HandleType(primitive, displaySettings);
        }
        // private variables
        this.__entity = null;
        this.__handle = dataHandle;
        // inherits from
        Emitter.call(this);
        // apply mixins
        Loadable.call(this);
        Enableable.call(this);
        Destructible.call(this);
        if (this.__handle && this.__handle.draw) {
            Drawable.call(this);
        }
    }
    // private methods
    Component.prototype.__oninit = function() { };
    Component.prototype.__onload = function() { };
    Component.prototype.__onunload = function() { };
    Component.prototype.__ondestroy = function() { };
    Component.prototype.__registerDependencyOnLoad = function(subject, event, observer, callback) {
        // *** closures ***
        var self = this;
        var fnOnLoadProxy = this.__onload || function() { };
        this.__onload = function() {
            fnOnLoadProxy.apply(self, arguments);
            subject.addEventListener(event, observer, callback);
        };
        var fnOnUnloadProxy = this.__onunload || function() { };
        this.__onunload = function() {
            fnOnUnloadProxy.apply(self, arguments);
            subject.removeEventListener(event, observer);
        };
    };
    Component.prototype.__registerComponentDependencyOnLoad = function(componentString, event, observer, callback) {
        utils.validator.validateClassType(this, componentString, "component");
        utils.validator.validateInstanceType(this, event, "string");
        utils.validator.validateObject(this, observer);
        utils.validator.validateFunction(this, callback);
        // *** closures ***
        var self = this;
        var fnOnLoadProxy = this.__onload || function() { };
        this.__onload = function() {
            var component = this.__entity.getComponent(componentString);
            fnOnLoadProxy.apply(self, arguments);
            component.addEventListener(event, observer, callback);
        };
        var fnOnUnloadProxy = this.__onunload || function() { };
        this.__onunload = function() {
            var component = this.__entity.getComponent(componentString);
            fnOnUnloadProxy.apply(self, arguments);
            component.removeEventListener(event, observer);
        };
    };
    Component.prototype.__attachEventTriggerToHandleMethod = function(handleMethodName, event) {
        utils.validator.validateEventIsRegistered(this, event);
        utils.validator.validateFunction(this, this.__handle[handleMethodName]);
        var self = this;
        var fnProxy = this.__handle[handleMethodName];
        this.__handle[handleMethodName] = function() {
            fnProxy.apply(self.__handle, arguments);
            self.emit.apply(self, [event, self.__handle]);
        };
    };
    // public methods
    Component.prototype.getEntity = function(entity) {
        return this.__entity;
    };
    Component.prototype.setEntity = function(entity) {
        if (this.__entity) {
            utils.validator.throw(this, "setEntity", "An entity has already been set for this component");
        }
        this.__entity = entity;
        this.__entity.addEventListener("onload", this, this.load);
        this.__entity.addEventListener("onunload", this, this.unload);
        this.__entity.addEventListener("ondestroy", this, this.destroy);
    };
    Component.prototype.purgeEventListener = function(subscriber) {
        utils.validator.validateObject(this, subscriber);
        if (subscriber === this.__entity) {
            return;
        }
        if (utils.validator.isInstanceOfType(subscriber, "component") && this.__entity) {
            var componentString = utils.modules.getModuleName(subscriber);
            var entityComponent = this.__entity.getComponent(componentString);
            if (subscriber === entityComponent) {
                return;
            }
        }
        for (var event in this.__events) {
            if (this.__events.hasOwnProperty(event)) {
                this.__events[event].remove(subscriber);
            }
        }
    };
    Component.prototype.getHandle = function() {
        return this.__handle;
    };
    Component.prototype.getData = function() {
        if (this.__handle) {
            return this.__handle.getData();
        }
    };
    Component.prototype.setData = function(data) {
        if (this.__handle) {
            return this.__handle.setData(data);
        }
    };
    Component.prototype.getDisplaySettings = function() {
        if (this.__handle) {
            return this.__handle.getDisplaySettings();
        }
    };
    Component.prototype.setDisplaySettings = function(displaySettings) {
        if (this.__handle) {
            return this.__handle.setDisplaySettings(displaySettings);
        }
    };

    return Component;
});
