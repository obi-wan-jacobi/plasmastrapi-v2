import EVENT_BUS from '../EVENT_BUS';
import CreatorTool from '../tools/CreatorTool';
import DefaultTool from '../tools/DefaultTool';
import { TOOL_EVENT } from '../enums/TOOL_EVENT';
import DestructorTool from 'app/tools/DestructorTool';
import SelectorTool from 'app/tools/SelectorTool';
import WireTool from 'app/tools/WireTool';
import WireCutterTool from 'app/tools/WireCutterTool';
import { Constructor, Dict } from 'base/types';
import { app } from 'app/main';
import IController from 'app/interfaces/IController';
import IInputHandler from 'app/interfaces/IInputHandler';
import AndGate from 'digital-logic/digital-elements/AndGate';
import NandGate from 'digital-logic/digital-elements/NandGate';
import OrGate from 'digital-logic/digital-elements/OrGate';
import XorGate from 'digital-logic/digital-elements/XorGate';
import HoverGate from 'digital-logic/digital-elements/HoverGate';

export default class CommandController implements IController {

  private __toolEventMap: Dict<[Constructor<IInputHandler, {}>, {}]> = {
    [TOOL_EVENT.DEFAULT]: [DefaultTool, {}],
    [TOOL_EVENT.ANDGATE_CREATE]: [CreatorTool, { Etor: AndGate }],
    [TOOL_EVENT.NANDGATE_CREATE]: [CreatorTool, { Etor: NandGate }],
    [TOOL_EVENT.ORGATE_CREATE]: [CreatorTool, { Etor: OrGate }],
    [TOOL_EVENT.XORGATE_CREATE]: [CreatorTool, { Etor: XorGate }],
    [TOOL_EVENT.HOVERGATE_CREATE]: [CreatorTool, { Etor: HoverGate }],
    [TOOL_EVENT.GATE_DELETE]: [DestructorTool, {}],
    [TOOL_EVENT.SELECTION_BEGIN]: [SelectorTool, {}],
    [TOOL_EVENT.WIRE_CREATE]: [WireTool, {}],
    [TOOL_EVENT.WIRE_DELETE]: [WireCutterTool, {}],
  };

  public init(): void {
    this.__mapToolEventsToInputHandler();
  }

  private __mapToolEventsToInputHandler() {
    Object.keys(this.__toolEventMap).forEach((toolEvent: string) => {
      EVENT_BUS.subscribe({
        topic: toolEvent,
        id: this.constructor.name,
        fn: () => app.controllers.input.setHandler(...this.__toolEventMap[toolEvent]),
      });
    });
  }
}