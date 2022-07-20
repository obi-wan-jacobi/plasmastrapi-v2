import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';

export default interface IEntityContainer<T> extends IHTML5CanvasElement {

  items: Set<T>;

}