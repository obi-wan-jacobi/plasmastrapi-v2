
import ActivateToolCommand from './ActivateToolCommand';
import ActiveTool from '../entities/tools/ActiveTool';
import ActiveToolButtonFrame from '../entities/tools/ActiveToolButtonFrame';
import Command from '../../framework/invocables/Command';
import PoseComponent from '../../engine/components/PoseComponent';
import StoreMaster from '../../engine/masters/StoreMaster';

export default class ResetActiveToolCommand extends Command<void, void> {

    constructor(store: StoreMaster) {
        super({ method: (): void => {
            store.entities.get(ActiveTool).first((tool: ActiveTool) => {
                store.entities.get(ActiveToolButtonFrame)
                    .first((frame) => frame.unload());
                const caret = store.entities.get(tool.toolButton.ToolCaretCtor)
                    .first((c) => c.unload())!;
                tool.unload();
                new ActivateToolCommand(store).invoke({
                    position: caret.get(PoseComponent).data,
                    toolButton: tool.toolButton,
                });
            });
        }});
    }

}
