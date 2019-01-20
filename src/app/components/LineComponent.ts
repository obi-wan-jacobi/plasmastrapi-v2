import Component from '../../engine/abstracts/Component';
import Entity from '../../engine/abstracts/Entity';

export default class LineComponent extends Component<{ head: Entity, tail: Entity }> {

    constructor({ head, tail }: { head: Entity, tail: Entity }) {
        super({ head, tail });
    }

}
