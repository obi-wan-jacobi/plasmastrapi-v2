const logger = {} as any;

logger.__buildMessage = (level: string, referer: any, methodName: any, messageString: string, punctuationCharacter: string) => {
    var refererString = typeof referer === 'string' ? referer : referer.constructor.name;
    methodName = typeof methodName === 'string' ? methodName : methodName.name;
    messageString = [ 
        `[${level}]`,
        ` >> `,
        `${refererString}`,
        `::`,
        `${methodName}`,
        ` >> `,
        `${messageString}${punctuationCharacter || ''}`
    ].join('');
    return messageString;
};

logger.console = (text: string) => {
    text = `{${(new Date()).toISOString()}} ${text}\n`; 
    console.log(text);
    // process.stdout.write(text);
    return text;
};

logger.pretty = (level: string, referer: object, methodName: any, messageString: string, punctuationCharacter: string) => {
    messageString = logger.__buildMessage(level, referer, methodName, messageString, punctuationCharacter);
    return logger.console(messageString);
};

logger.errorWithStackTrace = (referer: object, methodName: any, messageString: string) => {
    var message = logger.__buildMessage('ERROR', referer, methodName, messageString, '!');
    logger.console(new Error(message).stack);
    return message;
};

logger.write = (referer: object, methodName: any, messageString: string) => {
    return logger.pretty('WRITE', referer, methodName, messageString, null);
};

logger.debug = (referer: object, methodName: any, messageString: string) => {
    return logger.pretty('*** DEBUG ***', referer, methodName, messageString, '.');
};

logger.info = (referer: object, methodName: any, messageString: string) => {
    return logger.pretty('INFO', referer, methodName, messageString, '.');
};

logger.warn = (referer: object, methodName: any, messageString: string) => {
    return logger.pretty('WARNING', referer, methodName, messageString, '!');
};

logger.error = (referer: object, methodName: any, messageString: string) => {
    return logger.pretty('ERROR', referer, methodName, messageString, '!');
};

logger.stringify = (obj: any) => {
    return logger.info(logger, 'stringify', JSON.stringify(obj));
};

export default logger;