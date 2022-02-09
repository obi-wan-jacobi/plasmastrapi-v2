import IEntity from 'engine/interfaces/IEntity';
import DesignerTool from '../abstracts/DesignerTool';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';
import Gate from 'digital-logic/entities/Gate';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';

export default class CreatorTool extends DesignerTool<IEntity> {

  public equip(): void {
    super.equip();
    this.__preview();
  }

  public [MOUSE_EVENT.MOUSE_UP]({}: { mouseEvent: IMouseEvent }): void {
      this._target!.$mutate(MouseComponent)({
        events: {
          [MOUSE_EVENT.MOUSE_ENTER]: [[StyleComponent.name, { colour: 'YELLOW' }]],
          [MOUSE_EVENT.MOUSE_LEAVE]: [[StyleComponent.name, { colour: '' }]],
        },
        pipes: {
          [MOUSE_EVENT.MOUSE_DOWN]: [['designer', { name: DESIGNER_EVENT.SELECT }]],
        },
        isHovered: false,
      });
      this.dispose();
    }

    private __preview(): void {
      const { x, y } = this._prevDefinedMouseEvent || { x: 0, y: 0 };
      this._target = new Gate({ x, y, src: './AndGate.png' });
    }

}