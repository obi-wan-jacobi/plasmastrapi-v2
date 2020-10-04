
export type Constructor<TClass, TArg> = new (arg: TArg) => TClass & (Function & { prototype: TClass });
export type Index<T extends any> = { [key: string]: T };
export type Optional<T> = T | undefined;
