import GateCreationButton from '../entities/buttons/GateCreationButton';
import GateRemovalButton from '../entities/buttons/GateRemovalButton';
import WireRemovalButton from '../entities/buttons/WireRemovalButton';

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
        Ctor: GateCreationButton,
        args: { x: 40, y: 640 },
    },
];
