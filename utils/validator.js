import logging from 'logging';
import modules from 'modules';

class Validator {
    
    // throws
    throw(referer, methodName, errorString) {
        errorString = logging.error(referer, methodName, errorString);
        throw new Error(errorString);
    }

    throwMethodMustBeOverridden(referer, methodName) {
        this.throw(referer, methodName, `${referer.constructor.name} must override inherited method ${methodName}`);
    }

    // checks
    isNullOrUndefined(argument) {
        return argument === null || argument === undefined;
    }

    isInstanceOfType(instance, typeString) {
        if (typeString === 'string' || typeString === 'number') {
            return typeof instance === typeString;
        }
        var Type = modules.require(typeString)
        return instance instanceof Type || instance.constructor === Type;
    }

    isClassOfType(classString, typeString) {
        var ClassToValidate = modules.require(classString);
        return this.isInstanceOfType(ClassToValidate.prototype, typeString);
    }

    // validations
    validateNotNull(referer, argument) {
        if (this.isNullOrUndefined(argument)) {
            this.throw(this, this.validateNotNull, 'Argument cannot be null or undefined');
        }
    }

    validateObject(referer, argument) {
        this.validateNotNull(referer, argument);
        if (Object.getOwnPropertyNames(argument).length === 0) {
            this.throw(referer, this.validateObject, 'Argument must be a \'non-empty\' object');
        }
    }

    validateFunction(referer, argument) {
        if (typeof argument !== 'function') {
            this.throw(referer, this.validateFunction, 'Argument must be a function');
        }
    }

    validateInstanceType(referer, instance, typeString) {
        if (instance instanceof Array) {
            if (typeString === 'array') {
                return;
            }
            for (var i = 0, L = instance.length; i < L; i++) {
                this.validateInstanceType(referer, instance[i], typeString);
            }
        } else if (!this.isInstanceOfType(instance, typeString)) {
            this.throw(referer, this.validateInstanceType, `${instance} must be an instance of ${typeString}`);
        }
    }

    validateClassType(referer, classString, typeString) {
        if (!this.isClassOfType(classString, typeString)) {
            this.throw(referer, this.validateClassType, `${classString} must inherit from ${typeString}`);
        }
    }

    // emitter validations
    validateEventIsRegistered(emitter, event) {
        if (!emitter.hasEvent(event)) {
            this.throw(emitter, this.validateEventIsRegistered, `${emitter.constructor.name} has no registered \'${event}\' event`);
        }
    }

}

export default new Validator();