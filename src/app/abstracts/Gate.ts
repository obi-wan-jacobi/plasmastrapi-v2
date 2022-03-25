import InputTerminal from 'app/gates/InputTerminal';
import OutputTerminal from 'app/gates/OutputTerminal';
import Wire from 'app/gates/Wire';
import Dictionary from 'base/concretes/Dictionary';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default abstract class Gate extends HTML5CanvasElement {

  private __inputs = new Dictionary<Wire>();
  private __outputs = new Dictionary<Wire>();

  public constructor({ x, y, src }: { x: number; y: number; src: string }) {
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
    this.$add(ImageComponent)({ src, zIndex: 1 });
    this.$add(StyleComponent)({
      colour: '',
      fill: '',
      opacity: 0,
      zIndex: 1,
    });
    this.$add(MouseComponent)({ x: 0, y: 0, isHovered: false });
    this.$appendChild(new InputTerminal({ x, y }));
    this.$appendChild(new OutputTerminal({ x, y }));
  }

  public connectInput(wire: Wire): void {
    this.__inputs.write({ key: wire.$id, value: wire });
  }

  public connectOutput(wire: Wire): void {
    this.__outputs.write({ key: wire.$id, value: wire });
  }

  public disconnect(wire: Wire): void {
    this.__inputs.delete(wire.$id);
    this.__outputs.delete(wire.$id);
  }

  public $moveTo({ x, y }: IPoint): void {
    super.$moveTo({ x, y });
    this.__inputs.forEach((wire) => wire.updatePose());
    this.__outputs.forEach((wire) => wire.updatePose());
  }

  public $destroy(): void {
    super.$destroy();
    this.__inputs.forEach((wire) => wire.$destroy());
    this.__outputs.forEach((wire) => wire.$destroy());
  }

}