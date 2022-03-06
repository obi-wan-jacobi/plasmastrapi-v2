import System from 'engine/abstracts/System';
import IPipe from 'engine/interfaces/IPipe';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import ISystemMaster from 'engine/interfaces/ISystemMaster';
import { PLAYER_EVENT } from '../enums/PLAYER_EVENT';
import DesignerSystem from './DesignerSystem';
import GateSystem from './GateSystem';
import WireSystem from './WireSystem';

export default class PlayerSystem<TPipes extends { player: IPipe<IPipeEvent> }> extends System<TPipes> {

  public once({ systems, pipes }: { systems: ISystemMaster<any>; pipes: TPipes }): void {
    const event = pipes.player.event;
    if (!event) {
      return;
    }
    if (event.name === PLAYER_EVENT.START) {
      systems.remove(DesignerSystem);
      systems.add(GateSystem);
      systems.add(WireSystem);
      return;
    }
    if (event.name === PLAYER_EVENT.STOP) {
      systems.add(DesignerSystem);
      systems.remove(GateSystem);
      systems.remove(WireSystem);
      return;
    }
  }

}

