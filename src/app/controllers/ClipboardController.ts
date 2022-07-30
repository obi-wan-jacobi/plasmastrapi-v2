import { fromContainerToPasteIngredients, fromPasteIngredientsToPasta, PasteIngredients } from 'app/commands/PasteCommand';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import IController from 'app/interfaces/IController';
import IEntityContainer from 'app/interfaces/IEntityContainer';
import { app } from 'app/main';
import MoverBox from 'app/tools/MoverBox';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import { IPoint } from 'foundation/geometry/components/PoseComponent';

export default class ClipboardController implements IController {

  private __container?: IEntityContainer<DigitalElement>;
  private __pasteIngredients: PasteIngredients;

  public init(): void {

  }

  public copy(container: IEntityContainer<DigitalElement>): void {
    this.__container = container;
    this.__pasteIngredients = fromContainerToPasteIngredients(container);
  }

  public paste({ x, y }: IPoint): void {
    if (!this.__container) {
      return;
    }
    const moverBox = new MoverBox(this.__container);
    moverBox.items = new Set(
      fromPasteIngredientsToPasta(this.__pasteIngredients),
    );
    moverBox.moveTo({ x, y });
    app.entities.upkeep();
    EVENT_BUS.publish({ topic: TOOL_EVENT.PASTE });
  }

}