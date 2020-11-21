
export type Constructor<TClass, TArg> = new (arg: TArg) => TClass;
export type Dict<T extends any> = { [key: string]: T };
export type Optional<T> = T | undefined;
