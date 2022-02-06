import { Dict, Fn } from 'base/types';
import Gate from 'digital-logic/entities/Gate';
import IEntity from 'engine/interfaces/IEntity';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';
import IDisposable from 'base/interfaces/IDisposable';

interface IDesignerTool extends IDisposable {

  target?: IEntity;

}

export default class DefaultTool implements IDesignerTool {

  public target?: IEntity;
  private __prevDefinedMouseEvent?: IMouseEvent;

  public dispose(): void {
    this.target = undefined;
  }

  private __fromDesignerEventToFnMap: Dict<Fn<{ designerEvent: IPipeEvent }, void>> = {
    [DESIGNER_EVENT.RESET]: ({ designerEvent }: { designerEvent: IPipeEvent }): void => {
      designerEvent.target!.$mutate(MouseComponent)({
        events: {
          [MOUSE_EVENT.MOUSE_ENTER]: [[StyleComponent.name, { colour: 'YELLOW' }]],
          [MOUSE_EVENT.MOUSE_LEAVE]: [[StyleComponent.name, { colour: '' }]],
        },
        pipes: {
          [MOUSE_EVENT.MOUSE_DOWN]: [['designer', { name: DESIGNER_EVENT.SELECT }]],
        },
        isHovered: false,
      });
      this.target = undefined;
    },
    [DESIGNER_EVENT.PREVIEW]: (): void => {
      const { x, y } = this.__prevDefinedMouseEvent || { x: 0, y: 0 };
      this.target = new Gate({ x, y, src: './AndGate.png' });
    },
    [DESIGNER_EVENT.CREATE]: ({ designerEvent }: { designerEvent: IPipeEvent }): void => {
      this.__fromDesignerEventToFnMap[DESIGNER_EVENT.RESET]({ designerEvent });
    },
    [DESIGNER_EVENT.SELECT]: ({ designerEvent }: { designerEvent: IPipeEvent }) => {
      designerEvent.target!.$mutate(MouseComponent)({
        events: {
          [MOUSE_EVENT.MOUSE_ENTER]: [[StyleComponent.name, { colour: 'YELLOW' }]],
          [MOUSE_EVENT.MOUSE_LEAVE]: [[StyleComponent.name, { colour: 'YELLOW' }]],
        },
        pipes: {
          [MOUSE_EVENT.MOUSE_DOWN]: [['designer', { name: DESIGNER_EVENT.DESELECT }]],
        },
        isHovered: false,
      });
    },
    [DESIGNER_EVENT.DESELECT]: ({ designerEvent }: { designerEvent: IPipeEvent }) => {
      this.__fromDesignerEventToFnMap[DESIGNER_EVENT.RESET]({ designerEvent });
    },
  };

  private __fromMouseEventToFnMap: Dict<Fn<any, void>> = {
    [MOUSE_EVENT.MOUSE_MOVE]: ({ mouseEvent }: { mouseEvent: IMouseEvent}): void => {
      if (!this.target) {
        return;
      }
      this.target.$patch(PoseComponent)({ x: mouseEvent.x, y: mouseEvent.y });
    },
  };
}