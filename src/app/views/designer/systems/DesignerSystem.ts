import System from 'engine/abstracts/System';
import IPipe from 'engine/interfaces/IPipe';
import IPipeEvent from 'engine/interfaces/IPipeEvent';

export default class DesignerSystem<TPipes extends { designer: IPipe<IPipeEvent> }> extends System<TPipes> {

  public once({ pipes }: { pipes: TPipes }): void {
    if (!pipes.designer.event) {
      return;
    }
    console.log(pipes.designer.event!.name);
  }

}