import { IDataResult } from "./IDataResult";

export class ISuccessDataResult<T> extends IDataResult<T> {
  constructor(message: string, data: T) {
    super(true, message, data);
  }
}
