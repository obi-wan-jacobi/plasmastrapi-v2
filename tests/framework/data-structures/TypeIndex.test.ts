import TypeIndex from '../../../src/framework/data-structures/TypeIndex';
import Unique from '../../../src/framework/abstracts/Unique';

describe(TypeIndex.name, () => {

    let collection: TypeIndex<Unique, any>;
    let testType1: TestType1;
    let testType2: TestType2;
    let testType3: TestType3;

    beforeEach(() => {
        collection = new TypeIndex<Unique, any>();
        expect(collection.get(TestType1)).toBeUndefined();
        expect(collection.get(TestType2)).toBeUndefined();
        expect(collection.get(TestType3)).toBeUndefined();
        expect(collection.get(TestType4)).toBeUndefined();

        testType1 = collection.add(TestType1, '1');
        testType2 = collection.add(TestType2, 'one');
        testType3 = collection.add(TestType3, 'un');
    });

    it('Add multiple instance types', (done) => {
        __validate(
            true,
            true,
            true,
        );
        done();
    });

    it ('Remove some types', (done) => {
        //
        collection.remove(TestType1);
        collection.remove(TestType2);
        //
        __validate(
            false,
            false,
            true,
        );
        done();
    });

    it ('Remove yields undefined when nothing has been added', (done) => {
        expect(collection.remove(TestType4)).toBeUndefined();
        __validate(
            true,
            true,
            true,
        );
        done();
    });

    it('Purge everything', (done) => {
        expect(collection.purge()).toBe(true);
        __validate(
            false,
            false,
            false,
        );
        done();
    });

    const __validate = (
        isTestType1Expected: boolean,
        isTestType2Expected: boolean,
        isTestType3Expected: boolean,
    ) => {
        (isTestType1Expected)
            ? expect(collection.get(TestType1)).toBe(testType1)
            : expect(collection.get(TestType1)).toBe(undefined);
        (isTestType2Expected)
            ? expect(collection.get(TestType2)).toBe(testType2)
            : expect(collection.get(TestType2)).toBe(undefined);
        (isTestType3Expected)
            ? expect(collection.get(TestType3)).toBe(testType3)
            : expect(collection.get(TestType3)).toBe(undefined);
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
