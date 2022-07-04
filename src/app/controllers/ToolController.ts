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
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import { app } from 'app/main';
import GateButton from 'app/ui/buttons/GateButton';
import TrashButton from 'app/ui/buttons/TrashButton';
import WireCutterButton from 'app/ui/buttons/WireCutterButton';
import AndGate from 'digital-logic/digital-elements/AndGate';
import NandGate from 'digital-logic/digital-elements/NandGate';
import IController from 'app/interfaces/IController';

export default class ToolController implements IController {

  private __currentToolInitiator?: IEntity;
  private __initiatorStyle?: IStyle;

  private __toolingMap = {
    [TOOL_EVENT.DEFAULT]: DefaultTool,
    [TOOL_EVENT.GATE_CREATE]: CreatorTool,
    [TOOL_EVENT.GATE_DELETE]: DestructorTool,
    [TOOL_EVENT.SELECTION_BEGIN]: SelectorTool,
    [TOOL_EVENT.SELECTION_MOVE]: MoverTool,
    [TOOL_EVENT.WIRE_CREATE]: WireTool,
    [TOOL_EVENT.WIRE_DELETE]: WireCutterTool,
  } as Dict<Constructor<IInputHandler, any>>;

  public init(): void {
    const buttons = [
      new GateButton({ src: './AndGate.png', GateEtor: AndGate }),
      new GateButton({ src: './NandGate.png', GateEtor: NandGate }),
      new TrashButton(),
      new WireCutterButton(),
    ];
    for (let i = 0; i < buttons.length; i++) {
      if (i === 0) {
        buttons[0].$patch(PoseComponent, { x: 25, y: 25 });
        continue;
      }
      buttons[i].$patch(PoseComponent, { x: 25 + 50*i, y: 25 });
    }
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
          app.controllers.input.setHandler(new ToolConstructor(args));
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