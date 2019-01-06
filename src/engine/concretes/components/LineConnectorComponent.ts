import Component from '../../abstracts/Component';
import Entity from '../../abstracts/Entity';

export default class LineConnectorComponent extends Component<{ head: Entity, tail: Entity }> {

    constructor({ head, tail }: { head: Entity, tail: Entity }) {
        super({ head, tail });
    }

}
