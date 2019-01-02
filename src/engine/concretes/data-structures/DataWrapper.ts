import Wrapper from '../../abstracts/Wrapper';

export default class DataWrapper<T extends {}> extends Wrapper<T> {

    constructor(data: T) {
        super(data);
    }

}
