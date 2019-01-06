import Manifold from '../../../../framework/concretes/data-structures/Manifold';
import Unique from '../../../../framework/abstracts/Unique';

describe(Manifold.name, () => {

    let addedTestType1Ids: string[];
    let addedTestType2Ids: string[];
    let addedTestType3Ids: string[];
    let manifold: Manifold<TestType1>;
    let testType11: TestType1;
    let testType12: TestType1;
    let testType13: TestType1;
    let testType14: TestType1;
    let testType15: TestType1;
    let testType21: TestType2;
    let testType22: TestType2;
    let testType23: TestType2;
    let testType31: TestType3;
    let testType32: TestType3;
    let testType33: TestType3;
    let testType34: TestType3;

    beforeEach(() => {
        addedTestType1Ids = ['1', '2', '3', '4', '5'];
        addedTestType2Ids = ['one', 'two', 'three' ];
        addedTestType3Ids = ['un', 'deux', 'trois', 'quatre' ];
        manifold = new Manifold<TestType1>();
        testType11 = new TestType1('1');
        testType12 = new TestType1('2');
        testType13 = new TestType1('3');
        testType14 = new TestType1('4');
        testType15 = new TestType1('5');
        testType21 = new TestType2('one');
        testType22 = new TestType2('two');
        testType23 = new TestType2('three');
        testType31 = new TestType3('un');
        testType32 = new TestType3('deux');
        testType33 = new TestType3('trois');
        testType34 = new TestType3('quatre');
        manifold.add(testType34);
        manifold.add(testType11);
        manifold.add(testType23);
        manifold.add(testType21);
        manifold.add(testType14);
        manifold.add(testType15);
        manifold.add(testType12);
        manifold.add(testType11);
        manifold.add(testType22);
        manifold.add(testType13);
        manifold.add(testType31);
        manifold.add(testType11);
        manifold.add(testType32);
        manifold.add(testType33);
    });

    it('Adding multiple instances of several types sorts and stores everything', (done) => {
        __validate(
            ['1', '2', '3', '4', '5'],
            ['one', 'two', 'three'],
            ['un', 'deux', 'trois', 'quatre'],
        );
        done();
    });

    it ('Remove some instances of differing types', (done) => {
        //
        const removeResult1 = manifold.remove(testType14);
        const removeResult2 = manifold.remove(testType31);
        //
        expect(removeResult1).toBe(true);
        expect(removeResult2).toBe(true);
        __validate(
            ['1', '2', '3', '5'],
            ['one', 'two', 'three'],
            ['deux', 'trois', 'quatre'],
        );
        done();
    });

    it('Prune a type', (done) => {
        //
        const isPruned = manifold.prune(TestType2);
        //
        expect(isPruned).toBe(true);
        __validate(
            ['1', '2', '3', '4', '5'],
            [],
            ['un', 'deux', 'trois', 'quatre'],
        );
        done();
    });

    it('Prune a type that was never added is expected to fail', (done) => {
        expect(manifold.prune(TestType4)).toBe(false);
        __validate(
            ['1', '2', '3', '4', '5'],
            ['one', 'two', 'three'],
            ['un', 'deux', 'trois', 'quatre'],
        );
        done();
    });

    const __validate = (
        expectedTestType1Ids: string[],
        expectedTestType2Ids: string[],
        expectedTestType3Ids: string[],
    ) => {
        manifold.forEach((TestTypeCollection) => {
            TestTypeCollection.forEach((testType) => {
                if (testType.constructor === TestType1) {
                    addedTestType1Ids.splice(addedTestType1Ids.indexOf(testType.id), 1);
                } else if (testType.constructor === TestType3) {
                    addedTestType3Ids.splice(addedTestType3Ids.indexOf(testType.id), 1);
                }
            });
        });
        manifold.get(TestType2).forEach((testType) => {
            if (testType.constructor === TestType2) {
                addedTestType2Ids.splice(addedTestType2Ids.indexOf(testType.id), 1);
            }
        });
        expect(addedTestType1Ids.length).toBe(5 - expectedTestType1Ids.length);
        expect(addedTestType2Ids.length).toBe(3 - expectedTestType2Ids.length);
        expect(addedTestType3Ids.length).toBe(4 - expectedTestType3Ids.length);
        expect(manifold.get(TestType1).length).toBe(expectedTestType1Ids.length);
        expect(manifold.get(TestType2).length).toBe(expectedTestType2Ids.length);
        expect(manifold.get(TestType3).length).toBe(expectedTestType3Ids.length);
    };

});

class TestType1 extends Unique {

    constructor(id: string) {
        super(id);
    }

}

class TestType2 extends Unique {

    constructor(id: string) {
        super(id);
    }

}

class TestType3 extends Unique {

    constructor(id: string) {
        super(id);
    }

}

class TestType4 extends Unique {

}
