define(["utils"],
function(utils) {

    function Mixin(mixinString, dependencies) {
        dependencies = dependencies || [];
        utils.validator.validateInstanceType(this, this, "emitter");
        utils.validator.validateClassType(this, mixinString, "mixin");
        utils.validator.validateInstanceType(this, dependencies, "array");
        var MixinPrototype = utils.modules.require(mixinString).prototype;
        for (var i = 0, L = dependencies.length; i < L; i++) {
            var dependency = dependencies[i];
            utils.validator.validateInstanceType(this, dependency, "string");
            utils.validator.validateClassType(this, dependency, "mixin");
            var DependencyPrototype = utils.modules.require(dependency).prototype;
            if (!this[`is${DependencyPrototype.constructor.name}`]) {
                utils.validator.throw(this, MixinPrototype.constructor.name,
                    `${MixinPrototype.constructor.name} cannot be applied to ${this.constructor.name} because it depends on ${DependencyPrototype.constructor.name}`);
            }
        }
        Mixin.prototype.defineProperty.call(this, `is${MixinPrototype.constructor.name}`, function() { return true; });
        for (var propertyName in MixinPrototype) {
            if (MixinPrototype.hasOwnProperty(propertyName) && !(propertyName === "constructor")) {
                if (propertyName.slice(0, 2) === "__") {
                    Mixin.prototype.proxyMethod.call(this, MixinPrototype, propertyName);
                } else {
                    Mixin.prototype.addMethod.call(this, MixinPrototype, propertyName);
                }
            }
        }
    }
    Mixin.prototype.addProperty = function(propertyName, initialValue) {
        if (this[propertyName]) {
            utils.validator.throw(this, "addProperty", `A ${propertyName} property already exists on ${this.constructor.name}`);
        }
        this[propertyName] = initialValue;
    };
    Mixin.prototype.defineProperty = function(propertyName, initialValue, getMethod, setMethod) {
        utils.validator.validateInstanceType(this, propertyName, "string");
        if (getMethod) {
            utils.validator.validateFunction(this, getMethod);
        }
        if (setMethod) {
            utils.validator.validateFunction(this, setMethod);
        }
        if (this[propertyName]) {
            utils.validator.throw(this, "defineProperty", `A ${propertyName} property is already defined for ${this.constructor.name}`);
        }
        if (this[`__${propertyName}`]) {
            utils.validator.throw(this, "defineProperty", `A __${propertyName} property is already defined for ${this.constructor.name}`);
        }
        this[`__${propertyName}`] = initialValue;
        Object.defineProperty(this, propertyName,
        {
            get: getMethod || function() { return this[`__${propertyName}`]; },
            set: setMethod,
        });
    };
    Mixin.prototype.addMethod = function(MixinPrototype, methodName) {
        utils.validator.validateInstanceType(this, methodName, "string");
        if (!MixinPrototype[methodName]) {
            utils.validator.throw(this, "addMethod", `${MixinPrototype.constructor.name} does not possess a ${methodName} method`);
        }
        if (this[methodName]) {
            utils.validator.throw(this, "addMethod", `A ${methodName} already exists on ${this.constructor.name}`);
        }
        this[methodName] = MixinPrototype[methodName];
    };
    Mixin.prototype.proxyMethod = function(MixinPrototype, methodName) {
        utils.validator.validateInstanceType(this, methodName, "string");
        utils.validator.validateFunction(this, MixinPrototype[methodName]);
        if (this[methodName]) {
            utils.validator.validateFunction(this, this[methodName]);
            var proxy = this[methodName];
            var prototypeMethod = MixinPrototype[methodName];
            this[methodName] = function() {
                proxy.apply(this, arguments);
                prototypeMethod.apply(this, arguments);
            };
        } else {
            this[methodName] = MixinPrototype[methodName];
        }
    };

    return Mixin;
});
