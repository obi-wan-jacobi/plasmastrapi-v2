import { Dict } from 'core/types';

export default (obj: Object): any[] =>
  Object.keys(obj)
    .map((key: string) => (obj as Dict<string>)[key]);