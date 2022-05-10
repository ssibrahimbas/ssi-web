import { IResult } from "./IResult";

export class IErrorResult extends IResult {
  constructor(message: string) {
    super(false, message);
  }
}
