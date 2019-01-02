import IImpostor from '../interfaces/IImpostor';
import IVerifiable from '../interfaces/IVerifiable';
import Wrapper from '../../../engine/abstracts/Wrapper';
import * as sinon from 'sinon';

export default class Impostor<T> extends Wrapper<T> implements IImpostor {

    private __fake: T;
    private __mock: sinon.SinonMock;
    private __expectations: sinon.SinonExpectation[];

    constructor({ methods, fake }: { methods?: string[], fake?: IVerifiable }) {
        const f = (fake || { verify(): void { return; } }) as T & IVerifiable;
        super(f);
        this.__expectations = [];
        this.__initFake({ methods, instance: f });
        this.__initMock();
    }

    public expects(method: string): sinon.SinonExpectation {
        const expectation = this.__mock.expects(method);
        this.__expectations.push(expectation);
        return expectation;
    }

    public assertMethodsCalledInOrder(): void {
        sinon.assert.callOrder(...this.__expectations);
    }

    public verify(): void {
        if (this.__fake) {
            (this.__fake as unknown as IVerifiable).verify();
        }
        this.__mock.verify();
    }

    private __initFake({ methods, instance }: { methods?: string[], instance: T & IVerifiable }): void {
        const fake: { [key: string]: any } = instance;
        if (methods) {
            methods.forEach((methodName) => {
                fake[methodName] = (): void => undefined;
            });
        }
        this.__fake = fake as unknown as T;
    }

    private __initMock(): void {
        this.__mock = sinon.mock(this.__fake);
    }
}
