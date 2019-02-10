import { OnlyIfEntityIsInstanceOf } from '../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import { MOUSE_EVENT } from '../../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem, {
    OnCursorIntersection, OnMouseEvent,
} from '../../engine/abstracts/systems/MouseEventSystem';
import RenderingComponent from '../../engine/components/RenderingComponent';
import StartButton from '../entities/stage/buttons/StartButton';

const ON_COLOUR = HTML5_COLOUR.RED;
const OFF_COLOUR = HTML5_COLOUR.LIGHTGREEN;

export default class StartButtonSystem extends MouseEventSystem {

    @OnMouseEvent(MOUSE_EVENT.MOUSE_CLICK)
    @OnlyIfEntityIsInstanceOf(StartButton)
    @OnCursorIntersection
    public onMouseClick(component: MouseEventComponent): void {
        const button = component.entity;
        const isOff = button.get(RenderingComponent).data.colour === OFF_COLOUR;
        return isOff
            ? this.__start(button)
            : this.__stop(button);
    }

    private __start(button: StartButton): void {
        button.get(RenderingComponent).mutate({ colour: ON_COLOUR });
    }

    private __stop(button: StartButton): void {
        button.get(RenderingComponent).mutate({ colour: OFF_COLOUR });
    }

}
