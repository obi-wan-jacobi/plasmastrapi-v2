import IEntity from 'engine/interfaces/IEntity';
import IDictionary from 'base/interfaces/IDictionary';
import { Volatile } from 'base/types';

export default interface IHTML5CanvasEntity extends IEntity {
    readonly $parent: Volatile<IHTML5CanvasEntity>;
    readonly $children: IDictionary<IHTML5CanvasEntity>;
    $appendChild<T extends IHTML5CanvasEntity>(child: T): T;
    $removeChild<T extends IHTML5CanvasEntity>(child: T): void;
}