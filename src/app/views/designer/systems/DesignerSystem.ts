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

export default class DesignerSystem<TPipes extends { mouse: IPipe<IMouseEvent>; designer: IPipe<IPipeEvent> }> extends System<TPipes> {

  private __controller = new ToolController();

  public once({ pipes }: { pipes: TPipes }): void {
    const mouseEvent = pipes.mouse.event;
    const designerEvent = pipes.designer.event;
    this.__controller.once({ mouseEvent, designerEvent });
  }

}

class ToolController {

  private __target?: IEntity;

  private __fromDesignerEventToFnMap: Dict<Fn<any, void>> = {
    [DESIGNER_EVENT.PREVIEW]: ({ mouseEvent }: { mouseEvent: IMouseEvent }): void => {
      this.__target = new Gate({
        x: mouseEvent.x,
        y: mouseEvent.y,
        src: './AndGate.png',
      });
    },
  };

  private __fromMouseEventToFnMap: Dict<Fn<any, void>> = {
    [MOUSE_EVENT.MOUSE_MOVE]: ({ mouseEvent }: { mouseEvent: IMouseEvent }): void => {
      if (!this.__target) {
        return;
      }
      this.__target.$patch(PoseComponent)({ x: mouseEvent.x, y: mouseEvent.y });
    },
  };

  public once({ mouseEvent, designerEvent }: { mouseEvent?: IMouseEvent; designerEvent?: IPipeEvent }) {
    if (designerEvent && this.__fromDesignerEventToFnMap[designerEvent.name]) {
      this.__fromDesignerEventToFnMap[designerEvent.name]({ mouseEvent });
    }
    if (mouseEvent && this.__fromMouseEventToFnMap[mouseEvent.name]) {
      this.__fromMouseEventToFnMap[mouseEvent.name]({ mouseEvent });
    }
  }
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
        opacity: 0,
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
        // events: {
        //   'mouseenter': [[StyleComponent, { colour: 'YELLOW' }]],
        //   'mouseleave': [[StyleComponent, { colour: 'WHITE' }]],
        // },
        // pipes: {
        //   'mouseenter': [['designer', { name: DESIGNER_EVENT.CREATE }]],
        // },
        isHovered: false,
      },
    });
  }

}