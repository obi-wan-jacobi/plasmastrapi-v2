import { Dict, Fn } from 'base/types';
import System from 'engine/abstracts/System';
import IEntity from 'engine/interfaces/IEntity';
import IPipe from 'engine/interfaces/IPipe';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import UIEntity from 'ui/abstracts/UIEntity';
import { DESIGNER_EVENT } from '../pipes/DESIGNER_EVENT';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';

export default class DesignerSystem<TPipes extends { mouse: IPipe<IMouseEvent>; designer: IPipe<IPipeEvent> }> extends System<TPipes> {

  private __controller = new ToolController();

  public once({ pipes }: { pipes: TPipes }): void {
    const mouseEvent = pipes.mouse.event;
    if (mouseEvent) {
      this.__controller.handleMouseEvent({ mouseEvent });
    }
    const designerEvent = pipes.designer.event;
    if (designerEvent) {
      this.__controller.handleDesignerEvent({ designerEvent });
    }
  }

}

class ToolController {

  private __target?: IEntity;
  private __prevDefinedMouseEvent?: IMouseEvent;

  public handleMouseEvent({ mouseEvent }: { mouseEvent: IMouseEvent }) {
    if (this.__fromMouseEventToFnMap[mouseEvent.name]) {
      this.__fromMouseEventToFnMap[mouseEvent.name]({ mouseEvent });
    }
    if (mouseEvent) {
      this.__prevDefinedMouseEvent = mouseEvent;
    }
  }

  public handleDesignerEvent({ designerEvent }: { designerEvent: IPipeEvent }) {
    this.__fromDesignerEventToFnMap[designerEvent.name]({ designerEvent });
  }

  public reset(): void {
    this.__target = undefined;
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
      this.reset();
    },
    [DESIGNER_EVENT.PREVIEW]: (): void => {
      const { x, y } = this.__prevDefinedMouseEvent || { x: 0, y: 0 };
      this.__target = new Gate({ x, y, src: './AndGate.png' });
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
      if (!this.__target) {
        return;
      }
      this.__target.$patch(PoseComponent)({ x: mouseEvent.x, y: mouseEvent.y });
    },
  };
}

class Gate extends UIEntity {

  public constructor({ x, y, text, src }: { x: number; y: number; text?: string; src?: string }) {
    super({
      pose: { x, y, a: 0 },
      shape: {
        width: 40,
        height: 40,
      },
      style: {
        colour: '',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      },
      label: !text ? undefined : {
        fontSize: 10,
        text,
        offset: { x: -10, y: 4 },
      },
      image: !src ? undefined : {
        src,
        zIndex: 0,
      },
      mouse: {
        pipes: {
          [MOUSE_EVENT.MOUSE_UP]: [['designer', { name: DESIGNER_EVENT.CREATE }]],
        },
        isHovered: false,
      },
    });
  }

}