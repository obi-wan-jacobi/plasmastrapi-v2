import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import InputTerminal from 'digital-logic/terminals/InputTerminal';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import { RGBA_0 } from 'app/ui/COLOUR';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import { addWidthAndHeightAsShapeComponent } from 'foundation/helpers/entities';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import DigitalElement from './DigitalElement';

export default abstract class Gate extends DigitalElement {

  public constructor({ x, y, src }: { x: number; y: number; src: string }) {
    super({ x, y });
    addWidthAndHeightAsShapeComponent({ entity: this, width: 40, height: 40 });
    this.$add(ImageComponent, { src, zIndex: 1 });
    this.$add(StyleComponent, {
      colour: RGBA_0,
      fill: RGBA_0,
      opacity: 0,
      zIndex: 2,
    });
    this.$add(MouseComponent, { x: 0, y: 0, isHovered: false });
    this.$appendChild(new InputTerminal());
    this.$appendChild(new OutputTerminal());
  }

  public [MOUSE_EVENT.MOUSE_DOWN](): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.SELECTION_BEGIN });
  }

}