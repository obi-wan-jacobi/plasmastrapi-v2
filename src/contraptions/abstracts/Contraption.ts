import IContraption from 'contraptions/interfaces/IContraption';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default abstract class Contraption extends HTML5CanvasElement implements IContraption {

  public abstract reset(): void;

}