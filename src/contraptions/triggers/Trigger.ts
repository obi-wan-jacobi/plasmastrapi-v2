import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default abstract class Trigger extends HTML5CanvasElement {

  public abstract invoke(): void;

}