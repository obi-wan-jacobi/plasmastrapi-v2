import Component from '../../engine/abstracts/Component';

export default class LineComponent extends Component<{ head: string, tail: string }> {

    constructor({ head, tail }: { head: string, tail: string }) {
        super({ head, tail });
    }

}
