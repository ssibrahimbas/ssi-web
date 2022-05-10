import { IResult } from "./IResult";

export class IDataResult<T> extends IResult {
  data: T;

  constructor(success: boolean, message: string, data: T) {
    super(success, message);
    this.data = data;
  }
}
