import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import InputTerminal from 'app/gates/InputTerminal';
import OutputTerminal from 'app/gates/OutputTerminal';
import Wire from 'app/gates/Wire';
import Dictionary from 'base/concretes/Dictionary';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import { addWidthAndHeightAsShapeComponent } from 'foundation/helpers/entities';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import DigitalElement from './DigitalElement';

export default abstract class Gate extends DigitalElement {

  protected _inputs = new Dictionary<Wire>();
  protected _outputs = new Dictionary<Wire>();

  public constructor({ x, y, src }: { x: number; y: number; src: string }) {
    super();
    this.$add(PoseComponent)({ x, y, a: 0 });
    addWidthAndHeightAsShapeComponent({ entity: this, width: 40, height: 40 });
    this.$add(ImageComponent)({ src, zIndex: 1 });
    this.$add(StyleComponent)({
      colour: '',
      fill: '',
      opacity: 0,
      zIndex: 2,
    });
    this.$add(MouseComponent)({ x: 0, y: 0, isHovered: false });
    this.$appendChild(new InputTerminal({ x, y }));
    this.$appendChild(new OutputTerminal({ x, y }));
  }

  public abstract compute(): void;

  public connectInput(wire: Wire): void {
    this._inputs.write({ key: wire.$id, value: wire });
  }

  public connectOutput(wire: Wire): void {
    this._outputs.write({ key: wire.$id, value: wire });
  }

  public disconnect(wire: Wire): void {
    this._inputs.delete(wire.$id);
    this._outputs.delete(wire.$id);
  }

  public $moveTo({ x, y }: IPoint): void {
    super.$moveTo({ x, y });
    this._inputs.forEach((wire) => wire.updatePose());
    this._outputs.forEach((wire) => wire.updatePose());
  }

  public $destroy(): void {
    super.$destroy();
    this._inputs.forEach((wire) => wire.$destroy());
    this._outputs.forEach((wire) => wire.$destroy());
  }

  public [MOUSE_EVENT.MOUSE_DOWN](event: IMouseEvent): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.BEGIN_SELECTION, arg: event });
  }

}