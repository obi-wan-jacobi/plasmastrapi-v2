import Component from '../../engine/abstracts/Component';

export default class TranslationComponent
extends Component<{
    previous: {
        mouse: {
            x: number,
            y: number,
        },
    },
}> {

    constructor() {
        super({
            previous: {
                mouse: {
                    x: -Infinity,
                    y: -Infinity,
                },
            },
        });
    }

}
