import { IResult } from "./IResult";

export class ISuccessResult extends IResult {
  constructor(message: string) {
    super(true, message);
  }
}
