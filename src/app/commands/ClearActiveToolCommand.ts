
import ActiveTool from '../entities/tools/ActiveTool';
import ActiveToolButtonFrame from '../entities/tools/ActiveToolButtonFrame';
import Command from '../../framework/invocables/Command';
import StoreMaster from '../../engine/masters/StoreMaster';

export default class ClearActiveToolCommand extends Command<void, void> {

    constructor(store: StoreMaster) {
        super({ method: (): void => {
            store.entities.get(ActiveTool).first((tool: ActiveTool) => {
                store.entities.get(ActiveToolButtonFrame).first((frame) => frame.unload());
                store.entities.get(tool.toolButton.ToolCaretCtor).first((caret) => caret.unload());
                tool.unload();
            });
        }});
    }

}
