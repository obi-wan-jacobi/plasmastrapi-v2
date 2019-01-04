import Component from '../../abstracts/Component';

export default class TranslationComponent
extends Component<{
    previous: {
        cursor: {
            x: number,
            y: number,
        },
    },
}> {

    constructor() {
        super({
            previous: {
                cursor: {
                    x: -Infinity,
                    y: -Infinity,
                },
            },
        });
    }

}
