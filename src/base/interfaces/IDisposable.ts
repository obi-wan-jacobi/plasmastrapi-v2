
export default interface IDisposable {
  dispose(): void;
  readonly isDisposed: boolean;
}