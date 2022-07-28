import { RGBA_0 } from 'app/ui/COLOUR';
import InteractiveDigitalElement from 'digital-logic/abstracts/InteractiveDigitalElement';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import { addWidthAndHeightAsShapeComponent } from 'foundation/helpers/entities';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';

export default class HoverSwitch extends InteractiveDigitalElement {

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y });
    addWidthAndHeightAsShapeComponent({ entity: this, width: 40, height: 40 });
    this.$add(ImageComponent, { src: './hoverswitch.png', zIndex: 1 });
    this.$add(StyleComponent, {
      colour: RGBA_0,
      fill: RGBA_0,
      opacity: 0,
      zIndex: 2,
    });
    this.$appendChild(new OutputTerminal());
  }

  public compute(): void {
    //do nothing
  }

  public [MOUSE_EVENT.MOUSE_ENTER](): void {
    this.high();
  }

  public [MOUSE_EVENT.MOUSE_LEAVE](): void {
    this.low();
  }

}