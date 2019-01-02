import Link from '../../../../framework/concretes/data-structures/Link';

describe(Link.name, () => {

    let firstValue: {};
    let secondValue: {};
    let thirdValue: {};
    let first: Link<{}>;
    let second: Link<{}>;
    let third: Link<{}>;

    beforeEach(() => {
        firstValue = { value: 'first' };
        secondValue = { value: 'second' };
        thirdValue = { value: 'third' };
        first = new Link(firstValue);
        second = new Link(secondValue);
        third = new Link(thirdValue);
    });

    it('conjoin yields start<-->interior<-->end', (done) => {
        //
        Link.conjoin(first, second);
        Link.conjoin(second, third);
        //
        __validate([first, second, third], [firstValue, secondValue, thirdValue]);
        done();
    });

    it('between yields previous<-->target<-->next', (done) => {
        //
        second.between(first, third);
        //
        __validate([first, second, third], [firstValue, secondValue, thirdValue]);
        done();
    });

    it('this comes before next: this<-->next', (done) => {
        //
        first.before(second);
        second.before(third);
        //
        __validate([first, second, third], [firstValue, secondValue, thirdValue]);
        done();
    });

    it('this comes after previous: previous<-->this', (done) => {
        //
        third.after(second);
        second.after(first);
        //
        __validate([first, second, third], [firstValue, secondValue, thirdValue]);
        done();
    });

    it('this comes before next and after previous: previous<-->this<-->next', (done) => {
        //
        second.before(third);
        second.after(first);
        //
        __validate([first, second, third], [firstValue, secondValue, thirdValue]);
        done();
    });

    it('conjoin, before, after, between all work with undefined', (done) => {
        expect(first.before(undefined)).toEqual([first, undefined]);
        expect(first.after(undefined)).toEqual([undefined, first]);
        expect(Link.conjoin(undefined, first)).toEqual([undefined, first]);
        expect(Link.conjoin(first, undefined)).toEqual([first, undefined]);
        expect(Link.conjoin(undefined, undefined)).toEqual([undefined, undefined]);
        expect(first.between(undefined, undefined)).toEqual([undefined, first, undefined]);
        __validateValue(first, firstValue);
        __validatePrevious(first, undefined);
        __validateNext(first, undefined);
        done();
    });

});

const __validate = (linkSequence: Array<Link<any>>, expectedCorrespondingValues: any[]) => {
    expect(linkSequence.length).toBe(expectedCorrespondingValues.length);
    expect(linkSequence.length).toBeGreaterThan(1);
    __expectStart(linkSequence[0]);
    __expectEnd(linkSequence[linkSequence.length - 1]);
    linkSequence.forEach((link, index) => {
        if (index > 0 && index < linkSequence.length - 1) {
            __expectInterior(link);
        }
        __validateValue(link, expectedCorrespondingValues[index]);
        __validatePrevious(link, (index === 0) ? undefined : linkSequence[index - 1]);
        __validateNext(link, (index === linkSequence.length - 1) ? undefined : linkSequence[index + 1]);
    });
};

const __validateValue = <T>(link: Link<T>, value: T) => {
    expect(link.value).toBe(value);
};

const __validatePrevious = (link: Link<any>, expectedPrevious?: Link<any>): void => {
    expect(link.previous).toBe(expectedPrevious);
};

const __validateNext = (link: Link<any>, expectedNext?: Link<any>): void => {
    expect(link.next).toBe(expectedNext);
};

const __validateStartInteriorOrEnd =
(link: Link<any>, isStart: boolean, isInterior: boolean, isEnd: boolean) => {
    expect(link.isStart).toBe(isStart);
    expect(link.isInterior).toBe(isInterior);
    expect(link.isEnd).toBe(isEnd);
};

const __expectStart = (link: Link<any>) => {
    __validateStartInteriorOrEnd(link, true, false, false);
};

const __expectInterior = (link: Link<any>) => {
    __validateStartInteriorOrEnd(link, false, true, false);
};

const __expectEnd = (link: Link<any>) => {
    __validateStartInteriorOrEnd(link, false, false, true);
};
