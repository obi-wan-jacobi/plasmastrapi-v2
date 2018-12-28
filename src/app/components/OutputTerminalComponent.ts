import Component from '../../framework/abstracts/Component';

export default class OutputTerminalComponent
 extends Component<{
    offsetX: number,
    offsetY: number
}> {

    constructor() {
        super({ offsetX: 0, offsetY: -28 });
    }

}
