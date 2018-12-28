import Component from '../../abstracts/Component';

export default class TranslatableComponent
extends Component<{
    previous: {
        cursor: {
            x: number,
            y: number
        },
    }
}> {

    constructor() {
        super({
            previous: {
                cursor: {
                    x: -Infinity,
                    y: -Infinity
                },
            }
        });
    }

}
