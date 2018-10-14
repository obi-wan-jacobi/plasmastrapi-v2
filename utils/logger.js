

class Logger {
    
    __console(level, referer, methodName, messageString, punc) {
        var refererString = typeof referer === 'string' ? referer : referer.constructor.name;
        methodName = typeof methodName === 'string' ? methodName : methodName.name;
        messageString = `[${level}] >> ${refererString}::${methodName} >> ${messageString}${punc || ''}`;
        console.log(messageString);
        return messageString;
    }

    write(referer, methodName, messageString) {
        return this.__console('WRITE', referer, methodName, messageString, null);
    }

    debug(referer, methodName, messageString) {
        return this.__console('*** DEBUG ***', referer, methodName, messageString, '. *** /DEBUG ***');
    }

    info(referer, methodName, messageString) {
        return this.__console('INFO', referer, methodName, messageString, '.');
    }

    warn(referer, methodName, messageString) {
        return this.__console('WARNING', referer, methodName, messageString, '!');
    }

    error(referer, methodName, messageString) {
        return this.__console('ERROR', referer, methodName, messageString, '!');
    }

    alert(text) {
        window.alert(text);
    }

}

export default new Logger();