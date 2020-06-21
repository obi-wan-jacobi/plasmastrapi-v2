
export interface IDigital {
    isHigh: boolean;
    isLow: boolean;
    isOff: boolean;
    high(): void;
    low(): void;
    off(): void;
    sources(): IDigital[];
    lead(target: IDigital): void;
    unlead(target: IDigital): void;
    follow(souce: IDigital): void;
    unfollow(source: IDigital): void;
    once(): void;
    dispose(): void;
}
