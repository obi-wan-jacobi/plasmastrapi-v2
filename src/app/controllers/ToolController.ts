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

export default class ToolController {

  private __inputController: InputController;

  public constructor(inputController: InputController) {
    this.__inputController = inputController;
    EVENT_BUS.subscribe({
      topic: TOOL_EVENT.DEFAULT,
      id: this.constructor.name,
      fn: () => this.__inputController.setHandler(new DefaultTool()),
    });
    EVENT_BUS.subscribe({
      topic: TOOL_EVENT.CREATE_GATE,
      id: this.constructor.name,
      fn: (arg) => this.__inputController.setHandler(new CreatorTool({ target: arg })),
    });
    EVENT_BUS.subscribe({
      topic: TOOL_EVENT.DELETE_GATE,
      id: this.constructor.name,
      fn: () => this.__inputController.setHandler(new DestructorTool()),
    });
    EVENT_BUS.subscribe({
      topic: TOOL_EVENT.BEGIN_SELECTION,
      id: this.constructor.name,
      fn: (arg) => this.__inputController.setHandler(new SelectorTool(arg)),
    });
    EVENT_BUS.subscribe({
      topic: TOOL_EVENT.MOVE_SELECTION,
      id: this.constructor.name,
      fn: (arg) => this.__inputController.setHandler(new MoverTool(arg)),
    });
    EVENT_BUS.subscribe({
      topic: TOOL_EVENT.CREATE_WIRE,
      id: this.constructor.name,
      fn: (arg) => this.__inputController.setHandler(new WireTool({ target: arg })),
    });
    EVENT_BUS.subscribe({
      topic: TOOL_EVENT.DELETE_WIRE,
      id: this.constructor.name,
      fn: () => this.__inputController.setHandler(new WireCutterTool()),
    });
  }


}