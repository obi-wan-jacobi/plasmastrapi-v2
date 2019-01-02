import Wrapper from '../../../framework/abstracts/Wrapper';

export default class DataWrapper<T extends {}> extends Wrapper<T> {

    constructor(data: T) {
        super(data);
    }

}
