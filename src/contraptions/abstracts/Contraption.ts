import IContraption from 'contraptions/interfaces/IContraption';
import MachineInput from 'contraptions/parts/MachineInput';
import MachineOutput from 'contraptions/parts/MachineOutput';
import Part from './Part';

export default abstract class Contraption extends Part implements IContraption {

  public inputs: MachineInput[] = [];
  public outputs: MachineOutput[] = [];

}