define(["primitive", "validator"],
function(Primitive, validator) {

    Label.prototype = Object.create(Primitive.prototype);
    Label.prototype.constructor = Label;
    function Label(string) {
        Primitive.call(this);
        string = string || "";
        validator.validateInstanceType(this, string, "string");
        this.string = string;
    }

    return Label;
});
