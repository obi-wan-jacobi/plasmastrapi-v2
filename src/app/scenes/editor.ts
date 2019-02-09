import CircuitDesignArea from '../entities/editor/CircuitDesignArea';
import GateCreationButton from '../entities/editor/buttons/GateCreationButton';
import GateRemovalButton from '../entities/editor/buttons/GateRemovalButton';
import WireRemovalButton from '../entities/editor/buttons/WireRemovalButton';

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
        Ctor: CircuitDesignArea,
        args: { position: { x: 430, y: 340 }, width: 820, height: 520 },
    },
    {
        Ctor: GateCreationButton,
        args: { x: 40, y: 640 },
    },
];
