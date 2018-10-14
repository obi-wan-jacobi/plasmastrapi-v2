import logger from 'logger';
import settings from 'settings';

class ModulesHandler {

    __require(moduleName, mode) {
        var validator = require('validator');
        validator.validateInstanceType(this, moduleName, 'string');
        if (config.nativeTypes[moduleName]) {
            return config.nativeTypes[moduleName];
        }
        var module = null;
        try {
            module = require(moduleName);
        } catch (ex) {
            if (mode === 'strict') {
                validator.throw(this, this.__require, `No module named \'${moduleName}\' could be found`);
            } else {
                if (settings['utils']['modules']['info-on-failed-requires']) {
                    logging.info(this, this.__require, `No module named \'${moduleName}\' could be found`);
                }
            }
        }
        return module;
    }

    requireIfExists(moduleName) {
        return this.__require(moduleName, null);
    }

    require(moduleName) {
        return this.__require(moduleName, 'strict');
    }

    load(pathsObject, callback) {
        // Pre-loads named modules
        var modulePaths = [];
        for (var property in pathsObject) {
            if (pathsObject.hasOwnProperty(property)) {
                modulePaths.push(property);
            }
        }
        require(modulePaths, function () {
            callback();
        });
    }

    getModulePrefix(instanceOrType, typeSuffix) {
        var moduleName = null;
        if (typeof instanceOrType === 'function') {
            moduleName = instanceOrType.name;
        } else {
            moduleName = instanceOrType.constructor.name;
        }
        // Ex. ConstructorNameTypeSuffix --> constructor-name 
        return moduleName.split(typeSuffix)[0].split(/(?=[A-Z])/).join('-').toLowerCase();
    }

    getModuleName(instanceOrType) {
        return this.getModulePrefix(instanceOrType, null);
    }

    getBasePrimitiveModuleName(primitiveString) {
        var validator = require('validator');
        var Primitive = this.require('primitive');
        var PrimitiveType = this.require(primitiveString);
        var primitive = new (Function.prototype.bind.apply(PrimitiveType, [null]))();
        validator.validateInstanceType(this, primitive, 'primitive');
        var baseClass = primitive;
        while (Object.getPrototypeOf(baseClass).constructor.name !== Primitive.name) {
            baseClass = Object.getPrototypeOf(baseClass);
        }
        return this.getModuleName(baseClass);
    }

}

export default new ModulesHandler()l