import Gate from 'digital-logic/entities/Gate';
import PowerSource from 'digital-logic/entities/PowerSource';
import Wire from 'digital-logic/entities/Wire';
import System from 'engine/abstracts/System';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import IPipe from 'engine/interfaces/IPipe';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import ISystemMaster from 'engine/interfaces/ISystemMaster';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
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
    if (event?.name === PLAYER_EVENT.START) {
      systems.remove(DesignerSystem);
      systems.add(GateSystem);
      systems.add(WireSystem);
      ENTITIES.forEvery(PowerSource)((ps) => ps.high());
      return;
    }
    if (event?.name === PLAYER_EVENT.STOP) {
      systems.add(DesignerSystem);
      systems.remove(GateSystem);
      systems.remove(WireSystem);
      ENTITIES.forEvery(PowerSource)((ps) => ps.off());
      ENTITIES.forEvery(Gate)((gate) => gate.off());
      ENTITIES.forEvery(Wire)((wire) => wire.$patch(StyleComponent)({ colour: 'WHITE' }));
      return;
    }
  }

}

