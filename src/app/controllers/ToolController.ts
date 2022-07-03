import EVENT_BUS from '../EVENT_BUS';
import InputController from './InputController';
import CreatorTool from '../tools/CreatorTool';
import DefaultTool from '../tools/DefaultTool';
import { TOOL_EVENT } from '../enums/TOOL_EVENT';
import DestructorTool from 'app/tools/DestructorTool';
import SelectorTool from 'app/tools/SelectorTool';
import MoverTool from 'app/tools/MoverTool';
import WireTool from 'app/tools/WireTool';
import WireCutterTool from 'app/tools/WireCutterTool';
import { Constructor, Dict } from 'base/types';
import IInputHandler from 'app/interfaces/IInputHandler';
import IEntity from 'engine/interfaces/IEntity';
import StyleComponent, { IStyle } from 'foundation/presentation/components/StyleComponent';
import { RGBA_YELLOW } from 'app/ui/COLOUR';

export default class ToolController {

  private __inputController: InputController;
  private __currentToolInitiator?: IEntity;
  private __initiatorStyle?: IStyle;

  private __toolingMap = {
    [TOOL_EVENT.DEFAULT]: DefaultTool,
    [TOOL_EVENT.CREATE_GATE]: CreatorTool,
    [TOOL_EVENT.DELETE_GATE]: DestructorTool,
    [TOOL_EVENT.BEGIN_SELECTION]: SelectorTool,
    [TOOL_EVENT.MOVE_SELECTION]: MoverTool,
    [TOOL_EVENT.CREATE_WIRE]: WireTool,
    [TOOL_EVENT.DELETE_WIRE]: WireCutterTool,
  } as Dict<Constructor<IInputHandler, any>>;

  public constructor({ inputController, buttons }: { inputController: InputController; buttons: any[] }) {
    this.__inputController = inputController;
    this.__mapToolEventsToInputHandler();
  }

  private __mapToolEventsToInputHandler() {
    Object.keys(this.__toolingMap).forEach((toolEvent: string) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const ToolConstructor = this.__toolingMap[toolEvent];
      EVENT_BUS.subscribe({
        topic: toolEvent,
        id: this.constructor.name,
        fn: (args?: IToolCommand) => {
          this.__highlightCurrentToolInitiator(args?.initiator);
          this.__inputController.setHandler(new ToolConstructor(args));
        },
      });
    });
  }

  private __highlightCurrentToolInitiator(toolInitiator?: IEntity): void {
    if (this.__currentToolInitiator && this.__initiatorStyle) {
      this.__currentToolInitiator.$remove(StyleComponent);
      this.__currentToolInitiator.$add(StyleComponent, this.__initiatorStyle);
    }
    if (!toolInitiator) {
      return;
    }
    this.__currentToolInitiator = toolInitiator;
    this.__initiatorStyle = toolInitiator.$copy(StyleComponent);
    this.__currentToolInitiator.$patch(StyleComponent, { colour: RGBA_YELLOW });
  }

}

interface IToolCommand {
  initiator?: IEntity;
}