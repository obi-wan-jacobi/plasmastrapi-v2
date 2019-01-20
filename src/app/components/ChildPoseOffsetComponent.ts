import Component from '../../engine/abstracts/Component';

export default class ChildPoseOffsetComponent
 extends Component<{
    offsetX: number,
    offsetY: number,
}> {

    constructor({ offsetX, offsetY }: { offsetX: number, offsetY: number }) {
        super({ offsetX, offsetY });
    }

}
