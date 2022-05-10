import { SchemaOptions } from "@nestjs/mongoose/dist/decorators/schema.decorator";

export class TransformHelper {
  static defaultIdTransformer(): SchemaOptions {
    return {
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        },
      },
    };
  }
}
