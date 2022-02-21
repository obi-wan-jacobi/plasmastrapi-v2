import DesignerTool from '../abstracts/DesignerTool';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import DesignerView from '../DesignerView';
import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import InputTerminal from 'digital-logic/entities/InputTerminal';
import { EntityClass } from 'engine/types';
import OutputTerminal from 'digital-logic/entities/OutputTerminal';
import ImageComponent from 'foundation/presentation/components/ImageComponent';

export default class DefaultTool extends DesignerTool {

  public equip({ mouseEvent, keyboardEvent }: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent }): void {
    super.equip({ mouseEvent, keyboardEvent });
    this.__prepDesignerEvents();
    this.__prepTerminalEvents();
  }

  public dispose(): void {
    super.dispose();
    this.__clearEvents({ TargetClass: DesignerView });
    this.__clearEvents({ TargetClass: InputTerminal });
    this.__clearEvents({ TargetClass: OutputTerminal });
  }

  private __prepDesignerEvents(): void {
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

  private __clearEvents({ TargetClass }: { TargetClass: EntityClass<any> }): void {
    ENTITIES.forEvery(TargetClass)((designer) => {
      designer.$mutate(MouseComponent)({
        events: {},
        pipes: {},
        isHovered: false,
      });
    });
  }

  private __prepTerminalEvents(): void {
    ENTITIES.forEvery(InputTerminal)((input) => {
      input.$mutate(MouseComponent)({
        events: {
          [MOUSE_EVENT.MOUSE_ENTER]: [[ImageComponent.name, { src: './Terminal_hovered.png' }]],
          [MOUSE_EVENT.MOUSE_LEAVE]: [[ImageComponent.name, { src: './Terminal_in.png' }]],
        },
        pipes: {
          [MOUSE_EVENT.MOUSE_DOWN]: [['designer', { name: DESIGNER_EVENT.WIRING_MODE }]],
        },
        isHovered: false,
      });
    });
    ENTITIES.forEvery(OutputTerminal)((input) => {
      input.$mutate(MouseComponent)({
        events: {
          [MOUSE_EVENT.MOUSE_ENTER]: [[ImageComponent.name, { src: './Terminal_hovered.png' }]],
          [MOUSE_EVENT.MOUSE_LEAVE]: [[ImageComponent.name, { src: './Terminal_out.png' }]],
        },
        pipes: {
          [MOUSE_EVENT.MOUSE_DOWN]: [['designer', { name: DESIGNER_EVENT.WIRING_MODE }]],
        },
        isHovered: false,
      });
    });
  }

}
