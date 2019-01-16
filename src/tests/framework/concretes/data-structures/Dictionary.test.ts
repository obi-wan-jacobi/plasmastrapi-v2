import Dictionary from '../../../../framework/concretes/data-structures/Dictionary';

describe(Dictionary, () => {

    let dictionary: Dictionary<{ text: string }>;
    let firstTuple: { id: string, data: { text: string } };
    let secondTuple: { id: string, data: { text: string } };
    let thirdTuple: { id: string, data: { text: string } };

    beforeEach(() => {
        dictionary = new Dictionary<{ text: string }>();
        firstTuple = { id: '1', data: { text: 'one' } };
        secondTuple = { id: '2', data: { text: 'two' } };
        thirdTuple = { id: '3', data: { text: 'three' } };
    });

    it('empty dictionary returns undefined', (done) => {
        expect(dictionary.read(firstTuple.id)).toBeUndefined();
        expect(dictionary.read(secondTuple.id)).toBeUndefined();
        expect(dictionary.read(thirdTuple.id)).toBeUndefined();
        expect(dictionary.length).toBe(0);
        done();
    });

    it('can read + write + delete values', (done) => {
        const expectedDictionaryLengthAfterThreeAdditions = 3;
        const expectedDictionaryLengthAfterOneDeletion = 2;
        //
        dictionary.write({
            key: firstTuple.id,
            value: firstTuple.data,
        });
        dictionary.write({
            key: secondTuple.id,
            value: secondTuple.data,
        });
        dictionary.write({
            key: thirdTuple.id,
            value: thirdTuple.data,
        });
        //
        expect(dictionary.read(firstTuple.id)).toBe(firstTuple.data);
        expect(dictionary.read(secondTuple.id)).toBe(secondTuple.data);
        expect(dictionary.read(thirdTuple.id)).toBe(thirdTuple.data);
        expect(dictionary.length).toBe(expectedDictionaryLengthAfterThreeAdditions);
        //
        dictionary.delete(secondTuple.id);
        //
        expect(dictionary.read(firstTuple.id)).toBe(firstTuple.data);
        expect(dictionary.read(secondTuple.id)).toBeUndefined();
        expect(dictionary.read(thirdTuple.id)).toBe(thirdTuple.data);
        expect(dictionary.length).toBe(expectedDictionaryLengthAfterOneDeletion);
        done();
    });

    it('write to existing entry will overwrite previous with new', (done) => {
        const expectedDictionaryLengthAfterOneAddition = 1;
        //
        dictionary.write({
            key: firstTuple.id,
            value: firstTuple.data,
        });
        //
        expect(dictionary.read(firstTuple.id)).toBe(firstTuple.data);
        expect(dictionary.length).toBe(expectedDictionaryLengthAfterOneAddition);
        //
        const differentValue = { text: 'I\'m so different!' };
        dictionary.write({
            key: firstTuple.id,
            value: differentValue,
        });
        //
        expect(dictionary.read(firstTuple.id)).toBe(differentValue);
        expect(dictionary.length).toBe(expectedDictionaryLengthAfterOneAddition);
        done();
    });

    it('flush removes all elements', (done) => {
        dictionary.write({
            key: firstTuple.id,
            value: firstTuple.data,
        });
        dictionary.write({
            key: secondTuple.id,
            value: secondTuple.data,
        });
        dictionary.write({
            key: thirdTuple.id,
            value: thirdTuple.data,
        });
        //
        dictionary.flush();
        //
        expect(dictionary.read(firstTuple.id)).toBeUndefined();
        expect(dictionary.read(secondTuple.id)).toBeUndefined();
        expect(dictionary.read(thirdTuple.id)).toBeUndefined();
        expect(dictionary.length).toBe(0);
        done();
    });

    it('forEach iterates through all elements', (done) => {
        dictionary.write({
            key: firstTuple.id,
            value: firstTuple.data,
        });
        dictionary.write({
            key: secondTuple.id,
            value: secondTuple.data,
        });
        dictionary.write({
            key: thirdTuple.id,
            value: thirdTuple.data,
        });
        //
        dictionary.forEach((value) => {
            value.text = 'hello';
        });
        //
        expect(firstTuple.data.text).toBe('hello');
        expect(secondTuple.data.text).toBe('hello');
        expect(thirdTuple.data.text).toBe('hello');
        done();
    });

    it('map returns transform of all elements', (done) => {
        dictionary.write({
            key: firstTuple.id,
            value: firstTuple.data,
        });
        dictionary.write({
            key: secondTuple.id,
            value: secondTuple.data,
        });
        dictionary.write({
            key: thirdTuple.id,
            value: thirdTuple.data,
        });
        //
        const transforms = dictionary.map((value) => {
            return `${value.text} -- transformed!`;
        });
        //
        expect(transforms).toEqual([firstTuple, secondTuple, thirdTuple].map((tuple) => {
            return `${tuple.data.text} -- transformed!`;
        }));
        done();
    });

    it('get first element', (done) => {
        dictionary.write({
            key: firstTuple.id,
            value: firstTuple.data,
        });
        dictionary.write({
            key: secondTuple.id,
            value: secondTuple.data,
        });
        dictionary.write({
            key: thirdTuple.id,
            value: thirdTuple.data,
        });
        //
        const result = dictionary.first();
        //
        expect(result).toBe(firstTuple.data);
        done();
    });

});
