import ActiveTool from '../entities/tools/ActiveTool';
import ActiveToolButtonFrame from '../entities/tools/ActiveToolButtonFrame';
import Command from '../../framework/invocables/Command';
import IPosition2D from '../../geometry/interfaces/IPosition2D';
import IStoreMaster from '../../engine/interfaces/IStoreMaster';
import ToolButton from '../abstracts/ToolButton';

export default class ActivateToolCommand extends Command<{ position: IPosition2D, toolButton: ToolButton }, void> {

    constructor(store: IStoreMaster) {
        super({ method: ({ position, toolButton }: { position: IPosition2D, toolButton: ToolButton }): void => {
            store.entities.create(ActiveTool, {
                position,
                toolButton,
            });
            store.entities.create(toolButton.ToolCaretCtor, position);
            store.entities.create(ActiveToolButtonFrame, toolButton);
        }});
    }

    public invoke({ position, toolButton }: { position: IPosition2D, toolButton: ToolButton }): void {
        super.invoke({ position, toolButton });
    }

}
