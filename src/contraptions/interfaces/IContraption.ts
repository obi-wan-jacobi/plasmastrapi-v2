import MachineInput from 'contraptions/parts/MachineInput';
import MachineOutput from 'contraptions/parts/MachineOutput';

export default interface IContraption {

  inputs: MachineInput[];
  outputs: MachineOutput[];
  reset(): void;

}