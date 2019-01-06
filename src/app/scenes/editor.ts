import GateFactoryButton from '../entities/GateFactoryButton';
import GateRemovalButton from '../entities/GateRemovalButton';
import WireRemovalButton from '../entities/WireRemovalButton';

export default [
    {
        Ctor: WireRemovalButton,
        args: { x: 40, y: 40 },
    },
    {
        Ctor: GateRemovalButton,
        args: { x: 100, y: 40 },
    },
    {
        Ctor: GateFactoryButton,
        args: { x: 40, y: 640 },
    },
];
