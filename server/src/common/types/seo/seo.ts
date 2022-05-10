import { Charset } from "../charset";

export class Meta {
  name: string;
  content: string;
  charset?: Charset;

  static getOptions() {
    return {
      _id: false,
      name: {
        type: String,
      },
      content: {
        type: String,
      },
      charset: {
        type: String,
        default: Charset["utf-8"],
      },
    };
  }
}
