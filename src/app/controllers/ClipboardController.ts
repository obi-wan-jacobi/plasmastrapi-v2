import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import IController from 'app/interfaces/IController';
import IEntityContainer from 'app/interfaces/IEntityContainer';
import { app } from 'app/main';
import MoverBox from 'app/tools/MoverBox';
import { Dict } from 'base/types';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import Terminal from 'digital-logic/abstracts/Terminal';
import Wire from 'digital-logic/wires/Wire';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';

export default class ClipboardController implements IController {

  private __container?: IEntityContainer<DigitalElement>;
  private __wires: Wire[];

  public init(): void {

  }

  public copy(container: IEntityContainer<DigitalElement>): void {
    this.__container = container;
    this.__wires = [...this.__container.items].reduce((result, element) => {
      return result.concat(element.$children.filter((child) => child instanceof Wire) as []);
    }, []).filter((wire, index, self) => self.indexOf(wire) === index) as Wire[];
  }

  public paste({ x, y }: IPoint): void {
    if (!this.__container) {
      return;
    }
    const moverBox = new MoverBox(this.__container);
    moverBox.items = new Set();
    const ioMap: Dict<Terminal> = {};
    for (const item of this.__container.items) {
      const newElement = new (item as any).constructor(item.$copy(PoseComponent)) as DigitalElement;
      const newChildren = newElement.$children.toArray();
      const existingChildren = item.$children.toArray();
      for (let i = 0; i < existingChildren.length; i++) {
        if (existingChildren[i] instanceof Terminal) {
          ioMap[existingChildren[i].$id] = newChildren[i] as Terminal;
        }
      }
      moverBox.items.add(newElement);
    }
    for (const wire of this.__wires) {
      new Wire({
        input: ioMap[wire.input.$id] || wire.input,
        output: ioMap[wire.output.$id] || wire.output,
      });
    }
    const pose = this.__container.$copy(PoseComponent)!;
    moverBox.moveBy({
      dx: x - pose.x,
      dy: y - pose.y,
    });
    app.entities.upkeep();
    EVENT_BUS.publish({ topic: TOOL_EVENT.SELECTION_BEGIN });
  }

}