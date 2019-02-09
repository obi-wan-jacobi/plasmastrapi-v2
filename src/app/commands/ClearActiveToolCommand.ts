
import ActiveTool from '../entities/tools/ActiveTool';
import ActiveToolButtonFrame from '../entities/tools/ActiveToolButtonFrame';
import Command from '../../framework/invocables/Command';
import IStoreMaster from '../../engine/interfaces/IStoreMaster';

export default class ClearActiveToolCommand extends Command<void, void> {

    constructor(store: IStoreMaster) {
        super({ method: (): void => {
            store.entities.get(ActiveTool).first((tool: ActiveTool) => {
                store.entities.get(ActiveToolButtonFrame).first((frame) => frame.unload());
                store.entities.get(tool.toolButton.ToolCaretCtor).first((caret) => caret.unload());
                tool.unload();
            });
        }});
    }

}
