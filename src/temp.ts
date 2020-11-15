const isXmax = false;

class Mylass {

    protected _me: any;

    private __you(ok: any) {
        return ok;
    }
}

console.log(isXmax, new Mylass(), [1,2,3 ].find((x) => x === 1));