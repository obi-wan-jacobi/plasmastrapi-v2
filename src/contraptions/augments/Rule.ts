import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default abstract class Rule extends HTML5CanvasElement {

  public abstract invoke(): void;

}