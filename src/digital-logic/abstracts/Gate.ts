import InputTerminal from 'digital-logic/terminals/InputTerminal';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import { RGBA_0 } from 'app/ui/COLOUR';
import { addWidthAndHeightAsShapeComponent } from 'foundation/helpers/entities';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import InteractiveDigitalElement from './InteractiveDigitalElement';

export default abstract class Gate extends InteractiveDigitalElement {

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
    this.$appendChild(new InputTerminal());
    this.$appendChild(new OutputTerminal());
  }

}