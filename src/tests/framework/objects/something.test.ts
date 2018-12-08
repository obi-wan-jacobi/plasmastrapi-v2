/* tslint:disable:max-classes-per-file */

test('sandbox', () => {

    class Thing {

        public prop: string;

        constructor(prop: string) {
            this.prop = prop;
        }

        public save(): void {
            console.log('save');
        }
        public restore(): void {
            console.log('restore');
        }
    }

    const atomic = (
        target: MainThing,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) => {
        const method = descriptor.value;
        console.log('atomic descriptor.value ' + method);
        console.log('atomic propertyKey ' + propertyKey);
        descriptor.value = function(...args: any[]): void {
            console.log('args ' + args);
            console.log('json ' + target.constructor.name);
            console.log('instanceof ' + (this instanceof MainThing));
            this.thing.save();
            console.log(this.constructor.name);
            method.call(this, ...args);
            this.thing.restore();
        };
    };

    class MainThing {
        [key: string]: any;

        public thing: Thing;

        constructor(thing: Thing) {
            this.thing = thing;
        }

        @atomic
        public doAThing(something: string | string[]): void {
            // console.log('do a thing with ' + something);
        }

    }

    const main = new MainThing(new Thing('my prop'));

    // console.log('main thing ' + main.thing.prop);

    main.doAThing(['something', 'oh', 'hi']);

});
