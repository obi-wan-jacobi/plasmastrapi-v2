
export default class Dictionary { 
    
    constructor(typeString) {
        validator.validateInstanceType(this, typeString, "string");
        this.__typeString = typeString;
        this.__start = new Link("start");
        this.__end = new Link("end");
        this.__start.setNext(this.__end);
        this.__end.setPrevious(this.__start);
        this.__length = 0;
    }
    // private methods
    public __validateNoDuplicateKeys(key) {
        this.forEach(function(linkKey) {
            if (linkKey === key) {
                validator.throw(this, "validateNoDuplicateKeys", `Duplicate key: ${key}`);
            }
        }, this);
    }
    public __incrementLength() {
        this.__length++;
    }
    public __decrementLength() {
        if (this.__length === 0) {
            return;
        }
        this.__length--;
    }
    public __forEachLink(fn) {
        var link = this.__start.next();
        while (link.next() !== null) {
            var result = fn.call(this, link);
            // if fn returns a valid result
            if (result !== null && result !== undefined) {
                // effectively 'break' out of the loop with the result
                return result;
            }
            // if the current link being held for iteration has been freed
            if (link.next() === null) {
                // revert to the previous non-freed link
                link = link.previous();
            }
            // process the next link
            link = link.next();
        }
    }
    // public prototypal variables
    Object.defineProperties(Dictionary.prototype, {
        "length": {
            get: function() {
                return this.__length;
            },
        },
    });
    // public methods
    public forEach(fn, /* optional */ caller) {
        return this.__forEachLink(function(link) {
            var item = link.get();
            return fn.call(caller, item.key, item.value);
        });
    }
    public add(key, /* optional */ value) {
        this.__validateNoDuplicateKeys(key);
        if (value) {
            validator.validateInstanceType(this, value, this.__typeString);
        }
        var newLink = new Link({ key, value });
        if (this.length === 0) {
            this.__start.setNext(newLink);
            newLink.setPrevious(this.__start);
            newLink.setNext(this.__end);
            this.__end.setPrevious(newLink);

        } else {
            var oldLinkBeforeEnd = this.__end.previous();
            oldLinkBeforeEnd.setNext(newLink);
            newLink.setPrevious(oldLinkBeforeEnd);
            newLink.setNext(this.__end);
            this.__end.setPrevious(newLink);
        }
        this.__incrementLength();
    }
    public remove(key) {
        return this.__forEachLink(function(link) {
            if (link.get().key === key) {
                var previous = link.previous();
                var next = link.next();
                previous.setNext(next);
                next.setPrevious(previous);
                // A freed link can be identified by the fact that it has a null next() value
                link.setNext(null);
                this.__decrementLength();
                return link.get();
            }
        });
    }
    public get(key) {
        return this.__forEachLink(function(link) {
            if (link.get().key === key) {
                return link.get().value;
            }
        }, this);
    }
    public toArray() {
        var result = [];
        this.__forEachLink(function(link) {
            if (link !== this.__start && link !== this.__end) {
                var key = link.get().key;
                var value = link.get().value;
                result.push({ key, value });
            }
        });
        return result;
    }

}
