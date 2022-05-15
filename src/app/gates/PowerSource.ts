import DigitalElement from 'app/abstracts/DigitalElement';
import OutputTerminal from 'app/gates/OutputTerminal';
import Wire from 'app/gates/Wire';
import Dictionary from 'base/concretes/Dictionary';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';

export default class PowerSource extends DigitalElement {

  private __outputs = new Dictionary<Wire>();

  public constructor({ x, y }: { x: number; y: number }) {
    super();
    this.$add(PoseComponent)({ x, y, a: 0 });
    const width = 40, height = 40;
    this.$add(ShapeComponent)({
      vertices: [
        { x: -width/2, y: -height/2 },
        { x: -width/2, y: height/2 },
        { x: width/2, y: height/2 },
        { x: width/2, y: -height/2 },
      ],
    });
    this.$add(StyleComponent)({
      colour: '',
      fill: '',
      opacity: 0,
      zIndex: 2,
    });
    this.$add(MouseComponent)({ x: 0, y: 0, isHovered: false });
    this.$appendChild(new OutputTerminal({ x, y }));
  }

  public connectOutput(wire: Wire): void {
    this.__outputs.write({ key: wire.$id, value: wire });
  }

  public disconnect(wire: Wire): void {
    this.__outputs.delete(wire.$id);
  }

  public $moveTo({ x, y }: IPoint): void {
    super.$moveTo({ x, y });
    this.__outputs.forEach((wire) => wire.updatePose());
  }

  public $destroy(): void {
    super.$destroy();
    this.__outputs.forEach((wire) => wire.$destroy());
  }

}