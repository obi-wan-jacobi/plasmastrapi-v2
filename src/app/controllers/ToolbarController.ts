import { TOOL_EVENT } from '../enums/TOOL_EVENT';
import { Dict } from 'base/types';
import IEntity from 'engine/interfaces/IEntity';
import StyleComponent, { IStyle } from 'foundation/presentation/components/StyleComponent';
import { RGBA_YELLOW } from 'app/ui/COLOUR';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ToolButton from 'app/ui/buttons/GateButton';
import IController from 'app/interfaces/IController';

export default class ToolController implements IController {

  private __currentToolInitiator?: IEntity;
  private __initiatorStyle?: IStyle;

  private __buttonMap: Dict<TOOL_EVENT> = {
    ['./AndGate.png']: TOOL_EVENT.ANDGATE_CREATE,
    ['./NandGate.png']: TOOL_EVENT.NANDGATE_CREATE,
    ['./OrGate.png']: TOOL_EVENT.ORGATE_CREATE,
    ['./XorGate.png']: TOOL_EVENT.XORGATE_CREATE,
    ['./hoverswitch.png']: TOOL_EVENT.XORGATE_CREATE,
    ['./TRASHCAN.png']: TOOL_EVENT.GATE_DELETE,
    ['./CUTTER_OPEN.png']: TOOL_EVENT.WIRE_DELETE,
  };

  public init(): void {
    this.__mapSourceImagesToButtons();
  }

  private __mapSourceImagesToButtons(): void {
    const buttons = Object.keys(this.__buttonMap)
      .map((src) => new ToolButton({ src, toolEvent: this.__buttonMap[src] }));
    for (let i = 0; i < buttons.length; i++) {
      if (i === 0) {
        buttons[0].$patch(PoseComponent, { x: 25, y: 25 });
        continue;
      }
      buttons[i].$patch(PoseComponent, { x: 25 + 50*i, y: 25 });
    }
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