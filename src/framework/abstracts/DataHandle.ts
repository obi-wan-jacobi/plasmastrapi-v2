import DisplayOptions from "./DisplayOptions";

export default class DataHandle {

    private __data: any;
    private __displayOptions: DisplayOptions;

    constructor(data: any, displayOptions: DisplayOptions) {
        this.__data = data;
        this.__displayOptions = displayOptions;
    }

    public get data(): any {
        return this.__data;
    }
    public set data(data: any) {
        this.__data = data;
    }

    public get displayOptions(): DisplayOptions {
        return this.__displayOptions;
    }
    public set displayOptions(displayOptions: DisplayOptions) {
        this.__displayOptions = displayOptions;
    }

}
