import IVerifiable from '../interfaces/IVerifiable';

export default class FakeCanvas implements IVerifiable {

    [key: string]: any

    public verify(): void {
        return;
    }

    public simulateMouseEnter(clientX: number, clientY: number): void {
        this.onmouseenter(new MouseEvent('mouseenter', { clientX, clientY }));
    }

    public simulateMouseMove(clientX: number, clientY: number): void {
        this.onmousemove(new MouseEvent('mousemove', { clientX, clientY }));
    }

    public simulateMouseLeave(clientX: number, clientY: number): void {
        this.onmouseleave(new MouseEvent('mouseleave', { clientX, clientY }));
    }

    public simulateMouseDown(clientX: number, clientY: number): void {
        this.onmousedown(new MouseEvent('mousedown', { clientX, clientY }));
    }

    public simulateMouseUp(clientX: number, clientY: number): void {
        this.onmouseup(new MouseEvent('mouseup', { clientX, clientY }));
    }

    public simulateClick(clientX: number, clientY: number): void {
        this.onclick(new MouseEvent('click', { clientX, clientY }));
    }

}
