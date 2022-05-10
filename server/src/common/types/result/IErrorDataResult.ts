import { IDataResult } from "./IDataResult";

export class IErrorDataResult<T> extends IDataResult<T> {
  constructor(message: string, data: T) {
    super(false, message, data);
  }
}
