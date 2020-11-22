
export type Constructor<TClass, TArg> = new (arg: TArg) => TClass;
export type Dict<T> = { [key: string]: T };
export type Optional<T> = T | undefined;
export type Void<T> = ({}: T) => void;