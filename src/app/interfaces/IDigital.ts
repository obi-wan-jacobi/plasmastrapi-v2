import IUnique from 'src/data-structures/interfaces/IUnique';

export interface IDigital extends IUnique {
    isHigh: boolean;
    isLow: boolean;
    isOff: boolean;
    high(): void;
    low(): void;
    off(): void;
    to(target: IDigital): void;
    from(target: IDigital): void;
    detach(target: IDigital): void;
    compute(): void;
    dispose(): void;
}
