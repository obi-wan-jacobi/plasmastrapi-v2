import DesignerTool from '../abstracts/DesignerTool';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import DesignerView from '../DesignerView';
import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';

export default class DefaultTool extends DesignerTool {

  public equip({ mouseEvent, keyboardEvent }: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent }): void {
    super.equip({ mouseEvent, keyboardEvent });
    ENTITIES.forEvery(DesignerView)((designer) => {
      designer.$mutate(MouseComponent)({
        events: {},
        pipes: {
          [MOUSE_EVENT.MOUSE_DOWN]: [['designer', { name: DESIGNER_EVENT.SELECTION_MODE }]],
        },
        isHovered: false,
      });
    });
  }

  public dispose(): void {
    super.dispose();
    ENTITIES.forEvery(DesignerView)((designer) => {
      designer.$mutate(MouseComponent)({
        events: {},
        pipes: {},
        isHovered: false,
      });
    });
  }

}
