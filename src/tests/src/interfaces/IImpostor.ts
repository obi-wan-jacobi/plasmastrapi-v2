import IVerifiable from './IVerifiable';

export default interface IImpostor extends IVerifiable {

    expects(method: string): sinon.SinonExpectation;

    assertMethodsCalledInOrder(): void;

}
