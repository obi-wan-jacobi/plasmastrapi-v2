
export default interface IDataPrimitive {
    [key: string]: string | number | boolean | IDataPrimitive | IDataPrimitive[];
}
